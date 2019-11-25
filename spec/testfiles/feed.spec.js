var request = require("supertest");


describe("User can", () => {
	var server;
    beforeEach(() => {
        server = require("../../server");
    });
    afterEach(() => {
        server.close();
    });

    describe('GET api/v1/feed', () => {
    	it('should return a 200 for getting all feeds', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .get('/api/v1/feed')
		      .set({ Authorization: 'Bearer ' + token })     
		
		    expect(response.status).toBe(200);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'success',
		    }));
	  	});

	  	// it('should return a 200 if no feeds available in Database', async () => {
		  //   const loginResponse = await request(server)
		  //     .post('/api/v1/auth/signin')
		  //     .send({
		  //       email: 'yusuf@gmail.com',
		  //       password: '123456',
		  //     });
		  //   const token = loginResponse.body.data.token;
		  //   const response = await request(server)
		  //     .get('/api/v1/feed')
		  //     .set({ Authorization: 'Bearer ' + token })     
		
		  //   expect(response.status).toBe(200);
		  //   expect(response.body).toEqual(jasmine.objectContaining({
    //       		data: 'No Article/Gif found, kindly post one',
		  //   }));
	  	// });
    })
})