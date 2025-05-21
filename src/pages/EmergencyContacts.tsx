import React, { useState, useEffect } from 'react';
import { Phone, Mail, Trash2, UserPlus } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const validateForm = () => {
    const errors = {
      name: '',
      phone: '',
    };
    let isValid = true;
    
    if (!newContact.name.trim()) {
      errors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    if (!newContact.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const addContact = () => {
    if (!validateForm()) return;
    
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact
    };
    
    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '', email: '' });
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Contatos de Emergência</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Seus Contatos</h3>
            
            {contacts.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                  <Phone className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum contato de emergência adicionado ainda
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Adicione seus contatos de emergência para acesso rápido em caso de necessidade
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className="flex items-start justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                        <Phone className="h-4 w-4 mr-1" />
                        <span className="text-sm">{contact.phone}</span>
                      </div>
                      {contact.email && (
                        <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4 mr-1" />
                          <span className="text-sm">{contact.email}</span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => deleteContact(contact.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                      aria-label="Remover contato"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Formulário de contato */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Adicionar Contato</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  placeholder="Digite o nome completo"
                  className="form-input"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  placeholder="(00) 00000-0000"
                  className="form-input"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  placeholder="email@exemplo.com"
                  className="form-input"
                />
              </div>
              
              <button
                onClick={addContact}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <UserPlus className="h-5 w-5 mr-1" />
                Adicionar Contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;