export class ContactsService {
  
  employees = [
    { name: 'Mohit Jain', id: 123 },
    { name: 'Aparajita Jain', id: 223 },
    { name: 'Ram Singh', id: 323 },
    { name: 'Ming Lee', id: 423 },
    { name: 'Donald Trump', id: 523 },
    { name: 'Rahul Modi', id: 623 }
  ];
  
  getContacts() {
    return this.employees;  
  }
  
  getContact(id) {
    return this.employees.find(employeeContact => employeeContact.id == id);
  }
}