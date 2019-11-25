var request = require("supertest");


describe("User can", () => {
	var server;
    beforeEach(() => {
        server = require("../../server");
    });
    afterEach(() => {
        server.close();
    });

    describe('POST /api/v1/articles', () => {
    	it('should return a 200 response for creating an article', async () => {
	      const loginResponse = await request(server)
	        .post('/api/v1/auth/signin')
	        .send({
				email: "yusuf@gmail.com",
				password: "123456"
			});
	      const token = loginResponse.body.data.token;
	      const response = await request(server)
	        .post('/api/v1/articles')
	        .set({ Authorization: 'Bearer ' + token })
	        .send({
	          title: 'Hello World',
	          article: 'Welcome to the world',
	        });
	      expect(response.status).toBe(201);
	      expect(response.body).toEqual(jasmine.objectContaining({
	        status: 'success',
	      }));
	    });

	    it('should prevent unauthorized user from creating an article and return a 401 error', async () => {
	    	const response = await request(server)
	        .post('/api/v1/articles')
	        .send({
	          title: 'Hello World',
	          article: 'Welcome to the world',
	        });
	      expect(response.status).toBe(401);
	      expect(response.body).toEqual(jasmine.objectContaining({
	        error: {},
	      }));
	    })	   
    })


    describe('GET /api/v1/articles', () => {
    	it('should return 200 for article retrieved by id', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .get('/api/v1/articles/20')
		      .set({ Authorization: 'Bearer ' + token })     
		
		    expect(response.status).toBe(200);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'success',
		    }));
	  	});


	  	it('should return 404 for article not present in DB', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .get('/api/v1/articles/50000')
		      .set({ Authorization: 'Bearer ' + token })     
		
		    expect(response.status).toBe(404);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'error',
		    }));
	  	});
    })

    describe('DELETE /api/v1/articles/:id', () => {
    	it('should return 200 for article deleted successfully', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .delete('/api/v1/articles/21')
		      .set({ Authorization: 'Bearer ' + token })     
		
		    expect(response.status).toBe(200);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'success',
		    }));
	  	});
    })


    describe('PATCH /api/v1/articles/:id', () => {
    	it('should return 200 for article updated successfully', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .patch('/api/v1/articles/22')
		      .set({ Authorization: 'Bearer ' + token })     
			  .send({
		          title: 'Hello World',
		          article: 'Welcome to the world',
		        });

		    expect(response.status).toBe(201);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'success',
		    }));
	  	});
    })


    describe('POST /api/v1/articles/:id/comment', () => {
    	it('should return 200 for article commented successfully', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .post('/api/v1/articles/25/comment')
		      .set({ Authorization: 'Bearer ' + token })     
			  .send({
		          comments: 'Welcome to my first comment during testing',
		        });

		    expect(response.status).toBe(201);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'success',
		    }));
	  	});
    })
})