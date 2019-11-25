var request = require("supertest");


describe("User can", () => {
    var server;
    beforeEach(() => {
        server = require("../server");
    });
    afterEach(() => {
        server.close();
    });


    describe('GET /', () => {
        it('should return a 200 response for getting a single gif', async () => {
          const response = await request(server)
            .get('/')
            
          expect(response.status).toBe(200);
          expect(response.body).toEqual(jasmine.objectContaining({
            info: 'Node.js, Express, and Postgres API'
          }));
        });
    })
})