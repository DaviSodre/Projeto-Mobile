jest.mock('expo-linear-gradient', () => {
    return {
      LinearGradient: ({ children }) => <div>{children}</div>, // Retorna o que for passado
    };
  });
  
  jest.mock('@react-native-async-storage/async-storage', () => {
    return {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      
    };
  });
  

  jest.mock('expo-secure-store', () => {
    return {
      setItemAsync: jest.fn(),
      getItemAsync: jest.fn(),
      deleteItemAsync: jest.fn(),
    };
  });

  jest.mock('expo-crypto', () => {
    return {
      setItemAsync: jest.fn(),
      getItemAsync: jest.fn(),
      deleteItemAsync: jest.fn(),
    };
  });