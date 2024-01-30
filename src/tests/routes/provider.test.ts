import { server } from "../../index.js";
const request = require("supertest");

describe("Should describe the provider api route", () => {
  test("Should create a new provider", (done) => {
    request(server)
      .get("/booking")
      .send({
        firstName: "Brent",
        lastName: "Faiyaz",
        email: "bfaiyaz@gmail.com",
        phone: "8090001234",
        availabilties: [
          {
            weekDay: "Sunday",
            startAt: "09:00",
            endAt: "17:00",
          },
        ],
      })
      .expect(200)
      .end(done);
  });
});

// it("should return 200 and all available shops when the user requests /shop", (done) => {
//     request(app)
//       .get("/shop")
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .expect((res: any) => {
//         const shops = res.body.Shops;
//         const firstShop = shops[0];
//         expect(firstShop).toHaveProperty("Name", "Delicious Pie");
//       })
//       .end(done);
//   });
