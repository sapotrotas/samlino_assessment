export default {
  login(user, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const valid = (user === 'admin' && password === 'admin') || (user === 'user' && password === 'password');
        if (valid) {
          resolve({
            jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6ImZyb20gSldUIn0.XoByFQCJvii_iOTO4xlz23zXmb4yuzC3gqrWNt3EHrg",
            role: user === 'admin' ? "ADMIN" : "USER"
          });
        } else {
          reject();
        }
      }, 2000);
    });
  },
  signUp() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const valid = Math.random() < 0.8;
        if (valid) {
          resolve({});
        } else {
          reject();
        }
      }, 3000);
    });
  }
}