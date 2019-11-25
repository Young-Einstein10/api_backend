var request = require("supertest");


describe("User can signin", () => {
	var server;
    beforeEach(() => {
        server = require("../../server");
        // db.createEmployeeTable()
    });
    afterEach(() => {
        server.close();
    });

	describe('POST /api/v1/auth/signin', () => {
		it('should return a 401 for unauthorized request', async () => {
	    const res = await request(server)
	        .post('/api/v1/auth/signin')
	        .send({
				email: "yuf@gmail.com",
				password: "123456"
			});
	      expect(res.status).toBe(401);
	      expect(res.body).toEqual(jasmine.objectContaining({status: 'error'}));
	    });

	    it('should return a 401 error and incorrect password', async () => {
	    	const res = await request(server)
	    		.post('/api/v1/auth/signin')
	    		.send({
		          email: 'yusuf@gmail.com',
		          password: '000000',
		        })
		    expect(res.status).toBe(401);
	      	expect(res.body).toEqual(jasmine.objectContaining({	status: 'error'	}));
	      	expect(res.body).toEqual(jasmine.objectContaining({	error: 'Incorrect password'	}));    
	    })	

	    it('should return a 200 success when user logs in with correct email and password', async () => {
	      const res = await request(server)
	        .post('/api/v1/auth/signin')
	        .send({
	          email: 'yusuf@gmail.com',
	          password: '123456',
	        });
	      expect(res.status).toBe(200);
	      expect(res.body).toEqual(jasmine.objectContaining({ status: 'success', }));
	    });        
	})    
})

