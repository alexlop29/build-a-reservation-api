describe("Should demonstrate the expected functionality of the API", () => {
  test(
    "Should allow providers to submit times they are available for appointments",
  );
  // check
  test("Should limit appointment slots to 15 minutes");
  // check

  test("Should allow a client to retrieve all available appointment slots");
  // check

  test("Should allow a client to reserve an available appointment slot");
  // check

  test("Should allow clients to confirm their reservations");
  // check

  test(
    "Should expire reservations if not confirmed within 30 minutes of booking",
  );

  test("Should not allow new reservations for the upcoming 24 hours");
  // check
});

// Working on client, then booking will knock out a lot of these
