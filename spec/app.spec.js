var app = require("../app");
var route = require("../routes/user");
// var server = require("../server");
var Request = require("request");


describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../server");
    });
    afterAll(() => {
        server.close();
    });

    describe("GET /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it("Status 200", () => {
            expect(data.status).toBe(200);
        });

        it("Body", () => {
            expect(JSON.parse(data.body)).toEqual({'info': 'Node.js, Express, and Postgres API'});
        });
    });

    // describe("GET /getAllUsers", () => {
    // 	var data = {};
    //     beforeAll((done) => {
    //         Request.get("http://localhost:3000/getAllUsers", (error, response, body) => {
    //             data.status = response.statusCode;
    //             data.body = body;
    //             done();
    //         });
    //     });

    //     it("Status 200", () => {
    //         expect(data.status).toBe(200);
    //     });

    //     it("Body", () => {
    //         expect(JSON.parse(data.body)).toEqual({'info': 'Node.js, Express, and Postgres API'});
    //     });
    // })

    // describe("POST /auth/create-user", () => {

    // });

    // describe("POST /auth/signin", () => {

    // });

    // describe("POST /gifs", () => {

    // });

    // describe("POST /articles", () => {

    // });

    // describe("POST /articles/<:articleId>", () => {

    // });

    // describe("DELETE /articles/<:articleId>", () => {

    // });

    // describe("DELETE /gifs/<:gifId>", () => {

    // });

    // describe("POST /articles/<articleId>/comment", () => {

    // });

    // describe("POST /gifs/<:gifId>/comment", () => {

    // });

    // describe("GET /feed", () => {

    // });

    // describe("GET /articles/<:articleId>", () => {

    // });

    // describe("GET /gifs/<:gifId>", () => {

    // });
});