// Local Storage Database Simulation
const USERS_KEY = 'cleanup_users';
const CURRENT_USER_KEY = 'cleanup_current_user';
const TASKS_KEY = 'cleanup_tasks';

const getStoredUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveStoredUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Seed initial admin if requested
const seedAdmin = () => {
  const users = getStoredUsers();
  const targetPhone = '0822326011';
  if (!users.find(u => u.phone === targetPhone)) {
    users.push({
      uid: 'admin_isa_' + Math.random().toString(36).substr(2, 5),
      name: 'Admin ISA',
      phone: targetPhone,
      password: '2353',
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    saveStoredUsers(users);
  }
};

if (typeof window !== 'undefined') {
  seedAdmin();
}

export const storage = {
  // Authentication
  signup: async (name, phone, password, location, address) => {
    const users = getStoredUsers();
    if (users.find(u => u.phone === phone)) {
      throw { code: 'auth/email-already-in-use', message: 'Ce numéro est déjà utilisé' };
    }

    const newUser = {
      uid: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      password, // In a real app, this should be hashed, but for local system it's fine
      role: 'client',
      location: location || null,
      address: address || '',
      balance: 0,
      plan: null,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveStoredUsers(users);
    
    // Auto login
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  login: async (phone, password) => {
    const users = getStoredUsers();
    const user = users.find(u => u.phone === phone && u.password === password);
    
    if (!user) {
      throw { code: 'auth/invalid-credential', message: 'Numéro de téléphone ou mot de passe incorrect' };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  logout: async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Firestore Simulation
  getUser: async (uid) => {
    const users = getStoredUsers();
    return users.find(u => u.uid === uid) || null;
  },

  setDoc: async (uid, data) => {
    const users = getStoredUsers();
    const index = users.findIndex(u => u.uid === uid);
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
    } else {
      users.push({ uid, ...data });
    }
    saveStoredUsers(users);
  },

  createAgent: async (name, phone, password) => {
    const users = getStoredUsers();
    if (users.find(u => u.phone === phone)) {
      throw { code: 'auth/email-already-in-use', message: 'Ce numéro est déjà utilisé' };
    }

    const newAgent = {
      uid: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      password,
      role: 'agent',
      createdAt: new Date().toISOString()
    };

    users.push(newAgent);
    saveStoredUsers(users);
    return newAgent;
  },

  getAgents: async () => {
    const users = getStoredUsers();
    return users.filter(u => u.role === 'agent');
  },

  getAdmins: async () => {
    const users = getStoredUsers();
    return users.filter(u => u.role === 'admin');
  },

  getClients: async () => {
    const users = getStoredUsers();
    return users.filter(u => u.role === 'client');
  },

  createAdmin: async (name, phone, password) => {
    const users = getStoredUsers();
    if (users.find(u => u.phone === phone)) {
      throw { code: 'auth/email-already-in-use', message: 'Ce compte existe déjà !' };
    }

    const newAdmin = {
      uid: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      password,
      role: 'admin',
      createdAt: new Date().toISOString()
    };

    users.push(newAdmin);
    saveStoredUsers(users);
    return newAdmin;
  },

  updateUser: async (uid, data) => {
    const users = getStoredUsers();
    const index = users.findIndex(u => u.uid === uid);
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      saveStoredUsers(users);
      
      // Update current user if it's the one being modified
      const currentUser = storage.getCurrentUser();
      if (currentUser && currentUser.uid === uid) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]));
      }
      
      return users[index];
    }
    throw new Error("Utilisateur introuvable");
  },

  // Task Management (Planning)
  createTask: async (agentId, clientId, zone, date) => {
    const tasks = storage.getTasksSync();
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      agentId,
      clientId,
      zone,
      date,
      status: 'pending', // pending, completed
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return newTask;
  },

  getTasksSync: () => {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  getTasks: async () => {
    return storage.getTasksSync();
  },

  updateTaskStatus: async (taskId, status) => {
    const tasks = storage.getTasksSync();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      tasks[index].status = status;
      tasks[index].completedAt = status === 'completed' ? new Date().toISOString() : null;
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      return tasks[index];
    }
    throw new Error("Tâche introuvable");
  }
};
