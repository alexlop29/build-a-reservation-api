## Task

Build an API (e.g. RESTful) with the following endpoints:

- Allows providers to submit times they are available for appointments
  - e.g. On Friday the 13th of August, Dr. Jekyll wants to work between 8am and 3pm
- Allows a client to retrieve a list of available appointment slots
  - Appointment slots are 15 minutes long
- Allows clients to reserve an available appointment slot
- Allows clients to confirm their reservation

Additional Requirements:

- Reservations expire after 30 minutes if not confirmed and are again available for other clients to reserve that appointment slot
- Reservations must be made at least 24 hours in advance
