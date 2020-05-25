
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
         Make: "ford",
         Mileage: 1234,
         VIN: "4Y1SL65848Z411439",
         TransmissionType:"Cruise-O-Matic",
         Model: "carmobile",
         Title: "Rebuilt"
        },
        {
         Make: "GMC",
         Model: "Sierra SLT",
         Mileage: 286754,
         VIN: "4Y1SL65848Z411442",
         TransmissionType:"6L80-E"
        }
      ]);
    });
};
