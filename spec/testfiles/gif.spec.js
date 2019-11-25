var request = require("supertest");


describe("User can", () => {
	var server;
    beforeEach(() => {
        server = require("../../server");
    });
    afterEach(() => {
        server.close();
    });

 //    describe('POST /api/v1/gifs', () => {
 //    	it('should return a 200 response for creating a gif', async () => {
	//       const loginResponse = await request(server)
	//         .post('/api/v1/auth/signin')
	//         .send({
	// 			email: "yusuf@gmail.com",
	// 			password: "123456"
	// 		});
	//       const token = loginResponse.body.data.token;
	//       const response = await request(server)
	//         .post('/api/v1/gifs')
	//         .set({ Authorization: 'Bearer ' + token })
	//         .send({
	//           title: 'Hello World',
	//           article: 'Welcome to the world',
	//         });
	//       expect(response.status).toBe(201);
	//       expect(response.body).toEqual(jasmine.objectContaining({
	//         status: 'success',
	//       }));
	//     });
	// })

	describe('GET /api/v1/gifs/:id', () => {
    	it('should return a 200 response for getting a single gif', async () => {
	      const loginResponse = await request(server)
	        .post('/api/v1/auth/signin')
	        .send({
				email: "yusuf@gmail.com",
				password: "123456"
			});
	      const token = loginResponse.body.data.token;
	      const response = await request(server)
	        .get('/api/v1/gifs/4')
	        .set({ Authorization: 'Bearer ' + token })
	        
	      expect(response.status).toBe(200);
	      expect(response.body).toEqual(jasmine.objectContaining({
	        status: 'success',
	      }));
	    });


	    it('should return 404 for gif not present in DB', async () => {
		    const loginResponse = await request(server)
		      .post('/api/v1/auth/signin')
		      .send({
		        email: 'yusuf@gmail.com',
		        password: '123456',
		      });
		    const token = loginResponse.body.data.token;
		    const response = await request(server)
		      .get('/api/v1/gifs/50000')
		      .set({ Authorization: 'Bearer ' + token })     
		
		    expect(response.status).toBe(404);
		    expect(response.body).toEqual(jasmine.objectContaining({
		      status: 'error',
		    }));
	  	});
	})

	// describe('DELETE /api/v1/gifs/:id', () => {
 //    	it('should return 200 for GIF deleted successfully', async () => {
	// 	    const loginResponse = await request(server)
	// 	      .post('/api/v1/auth/signin')
	// 	      .send({
	// 	        email: 'yusuf@gmail.com',
	// 	        password: '123456',
	// 	      });
	// 	    const token = loginResponse.body.data.token;
	// 	    const response = await request(server)
	// 	      .delete('/api/v1/gifs/4')
	// 	      .set({ Authorization: 'Bearer ' + token })     
		
	// 	    expect(response.status).toBe(200);
	// 	    expect(response.body).toEqual(jasmine.objectContaining({
	// 	      status: 'success',
	// 	    }));
	//   	});
 //    })

})