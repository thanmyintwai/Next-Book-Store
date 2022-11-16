const users = [
    {
      googleId: 'fjeifjeijfiejfie',
    
    },
    {
      googleId: '2fjeijfeijfiej',
      
    }
  ];
  export default {
    getUsers: () => users,
    addUser: (user) => users.push(user),
  };