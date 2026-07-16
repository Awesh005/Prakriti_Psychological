import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_mock_only_for_prototype';

// Mock DB
let services = [
  { id: '1', categoryId: 'cat_ind', name: 'Anxiety Treatment', description: 'Evidence-based approaches to manage and overcome anxiety.' },
  { id: '2', categoryId: 'cat_ind', name: 'Stress Management', description: "Learn practical tools to navigate life's pressures." },
  { id: '3', categoryId: 'cat_rel', name: 'Couples Therapy', description: 'Rebuild connection and improve communication.' },
  { id: '4', categoryId: 'cat_child', name: 'Child Psychology', description: 'Specialized care for behavioral and emotional challenges.' },
  { id: '5', categoryId: 'cat_spec', name: 'EMDR Therapy', description: 'Advanced therapy for trauma and PTSD recovery.' },
];

let serviceCategories = [
  { id: 'cat_ind', name: 'Individual Therapy', description: 'One-on-one sessions tailored to your unique challenges.' },
  { id: 'cat_rel', name: 'Relationship & Family', description: 'Support for couples and families to foster healthier dynamics.' },
  { id: 'cat_child', name: 'Children & Teens', description: 'Compassionate care for younger minds.' },
  { id: 'cat_spec', name: 'Specialized Clinical', description: 'Advanced assessments and targeted clinical therapies.' },
  { id: 'cat_corp', name: 'Corporate', description: 'Wellness programs and psychological support for organizations.' },
];

let testimonials = [
  { id: '1', name: 'A. K.', quote: 'Dr. Prakriti helped me navigate a very difficult period with so much compassion. The clinic truly feels like a safe space.', rating: 5, approved: true },
  { id: '2', name: 'R. S.', quote: 'I was very anxious about my first therapy session, but I was made to feel completely at ease. Highly recommend.', rating: 5, approved: true },
  { id: '3', name: 'M.', quote: 'The couples therapy we received here saved our marriage. We learned to communicate again.', rating: 5, approved: true },
];

let appointments = [
  {
    id: '1',
    serviceId: '1',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    patientName: 'Jane Doe',
    patientPhone: '1234567890',
    patientEmail: 'jane@example.com',
    isNewPatient: true,
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

let users = [
  { id: '1', email: 'doctor@prakriticlinic.com', name: 'Dr. Prakriti Sinha', role: 'ADMIN', password: 'password123' },
  { id: '2', email: 'reception@prakriticlinic.com', name: 'Reception', role: 'STAFF', password: 'password123' },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Public APIs
  app.get('/api/services', (req, res) => {
    res.json({ categories: serviceCategories, services });
  });

  app.get('/api/testimonials', (req, res) => {
    res.json(testimonials.filter(t => t.approved));
  });

  app.post('/api/appointments', (req, res) => {
    const { serviceId, date, timeSlot, patientName, patientPhone, patientEmail, isNewPatient, notes } = req.body;
    const newApt = {
      id: uuidv4(),
      serviceId,
      date,
      timeSlot,
      patientName,
      patientPhone,
      patientEmail,
      isNewPatient,
      notes,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    appointments.push(newApt);
    res.json({ success: true, id: newApt.id });
  });

  // Auth
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  });

  // Middleware
  const requireAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  const requireAdmin = (req: any, res: any, next: any) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
    next();
  }

  // Admin APIs
  app.get('/api/admin/appointments', requireAuth, (req, res) => {
    res.json(appointments);
  });

  app.put('/api/admin/appointments/:id/status', requireAuth, (req, res) => {
    const { status } = req.body;
    const apt = appointments.find(a => a.id === req.params.id);
    if (apt) {
      apt.status = status;
      res.json(apt);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });
  
  app.get('/api/admin/stats', requireAuth, (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(a => a.date === today);
    const pendingAppointments = appointments.filter(a => a.status === 'Pending');
    const totalAppointments = appointments.length;
    res.json({
      todayCount: todayAppointments.length,
      pendingCount: pendingAppointments.length,
      totalCount: totalAppointments
    })
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
