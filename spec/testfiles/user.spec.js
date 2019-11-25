var request = require("supertest");


describe("User can", () => {
	var server;
    beforeEach(() => {
        server = require("../../server");
    });
    afterEach(() => {
        server.close();
    });

    describe('GET api/v1/getUser', () => {
    	it('should return a 200 for getting all users', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .get('/api/v1/getUser')
		      .set({ Authorization: 'Bearer ' + token })     
		
		    expect(response.status).toBe(200);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'success',
		    }));
	  	});
    })

    describe('GET /api/v1/getUser/:id', () => {
    	it('should return a 200 for getting user by id', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .get('/api/v1/getUser/9')
		      .set({ Authorization: 'Bearer ' + token })     
		
		    expect(response.status).toBe(200);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'success',
		    }));
	  	});

	  	describe('PATCH /api/v1/getUser/:id', () => {
	    	it('should return a 200 for getting user by id', async () => {
			    const loginResponse = await request(server)
			      .post('/api/v1/auth/signin')
			      .send({
			        email: 'yusuf@gmail.com',
			        password: '123456',
			      });
			    const token = loginResponse.body.data.token;
			    const response = await request(server)
			      .patch('/api/v1/getUser/7')
			      .set({ Authorization: 'Bearer ' + token })
			      .send({
			      	firstname: "lekan",
					lastname: "smart",
					email: "smart@gmail.com",
					password: "123456",
					gender: "male",
					jobrole: "security",
					department: "accounts",
					address: "San Francisco",
			      })     
			
			    expect(response.status).toBe(200);
			    expect(response.body).toEqual(jasmine.objectContaining({
			      status: 'success',
			    }));
		  	});
    	})


    	describe('DELETE /api/v1/getUser/:id', () => {
	    	it('should return a 200 for getting user by id', async () => {
			    const loginResponse = await request(server)
			      .post('/api/v1/auth/signin')
			      .send({
			        email: 'yusuf@gmail.com',
			        password: '123456',
			      });
			    const token = loginResponse.body.data.token;
			    const response = await request(server)
			      .delete('/api/v1/getUser/41')
			      .set({ Authorization: 'Bearer ' + token })     
			
			    expect(response.status).toBe(200);
			    expect(response.body).toEqual(jasmine.objectContaining({
			      status: 'success',
			    }));
		  	});
    	})
    })
})