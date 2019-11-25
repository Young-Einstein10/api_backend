var request = require("supertest");


describe("Admin can", () => {
	var server;
    beforeEach(() => {
        server = require("../../server");
        // db.createEmployeeTable()
    });
    afterEach(() => {
        server.close();
    });

    describe('POST /api/v1/admin/signin', () => {
    	it('should return a 200 for admin signin and token', async () => {
	    const res = await request(server)
	        .post('/api/v1/admin/signin')
	        .send({
		        username: "admin@teamwork.com",
		        password: "adminWork"
		    });
	      expect(res.status).toBe(200);
	      expect(res.body).toEqual(jasmine.objectContaining({status: 'success', token: res.body.token}));
	    });
    })

    describe('POST /api/v1/auth/createUser', () => {		

   //  it('should prevent non-admin users', async () => {
   //    //created user logs in
   //    	const res = await request(server)
	  //       .post('/api/v1/auth/signin')
	  //       .send({
	  //         email: 'yusuf@gmail.com',
	  //         password: '123456',
	  //       });
   //    const token = res.body.data.token;

   //    // Created user wants to create a new user
   //    const response = await request(server)
   //      .post('/api/v1/auth/createUser')
   //      .set({ Authorization: 'Bearer ' + token })
   //      .send({
   //       	firstname: "lekan",
			// lastname: "smart",
			// email: "smart@gmail.com",
			// password: "123456",
			// gender: "male",
			// jobrole: "security",
			// department: "accounts",
			// address: "San Francisco",
   //      });
   //    expect(response.status).toBe(401);
   //    expect(response.body).toEqual(jasmine.objectContaining({
        
   //    }));
   //  });


   //  it('should return success for creating user', async () => {
   //    const loginResponse = await request(server)
   //      .post('/api/v1/admin/signin')
   //      .send({
   //        email: 'admin@teamwork.com',
   //        password: 'adminWork',
   //      });
   //    const token = loginResponse.body.token;
   //    const res = await request(server)
   //      .post('/api/v1/auth/createUser')
   //      .set({ Authorization: 'Bearer ' + token })
   //      .send({
   //        firstname: "lekan",
			// lastname: "smart",
			// email: "smart@gmail.com",
			// password: "123456",
			// gender: "male",
			// jobrole: "security",
			// department: "accounts",
			// address: "washington"
   //      });
   //    expect(res.status).toBe(201);
   //    expect(res.body).toEqual(jasmine.objectContaining({
   //      status: 'success',
   //    }));
   //  });

 //    it('should show error user email already exists', async () => {

 //      const loginResponse = await request(server)
 //        .post('/api/v1/admin/signin')
 //        .send({
 //          email: 'admin@teamwork.com',
 //          password: 'adminWork',
 //        });
 //      const token = loginResponse.body.token;
 //      await request(server)
 //        .post('/api/v1/auth/createUser')
 //        .set({ Authorization: 'Bearer ' + token })
 //        .send({
 //          firstname: 'Mathew',
 //          lastname: 'John',
 //          gender: 'Male',
 //          jobrole: 'Senior Marketer',
 //          department: 'Accounting',
 //          address: '20, Adeola Odekun, VI Lagos',
 //          email: 'test@mail.com',
 //          password: 'western',
 //        });
 //      const resAgain = await request(server)
 //        .post('/api/v1/auth/createUser')
 //        .set({ Authorization: 'Bearer ' + token })
 //        .send({
 //          firstname: 'Mathew',
 //          lastname: 'John',
 //          gender: 'Male',
 //          jobrole: 'Senior Marketer',
 //          department: 'Accounting',
 //          address: '20, Adeola Odekun, VI Lagos',
 //          email: 'test@mail.com',
 //          password: 'western',
 //        });
 //      expect(resAgain.status).toBe(400);
 //      expect(resAgain.body).toEqual(jasmine.objectContaining({
 //        status: 'error',
 //      }));
 //      expect(resAgain.body).toEqual(jasmine.objectContaining({error: 'User with that EMAIL already exist'}));
 //    });
	})
})