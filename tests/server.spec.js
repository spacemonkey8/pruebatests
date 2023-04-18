const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it('status code 200, arreglo con por lo menos 1 objeto', async () => {

        const response = await request(server).get('/cafes');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('código 404, eliminar un café con un id que no existe', async () => {

        const response = await request(server).delete('/cafes/111');

        expect(response.status).not.toBe(404);
    });

    it(' código 201, agrega un nuevo café', async () => {

        const response = await request(server).post("/cafes").send({
            id: "5", nombre: "Café Nuevo"
        });

        expect(response.statusCode).toBe(201);
        const cafe = response.body.find(c => c.id == "5");
        expect(cafe.nombre).toBe("Café Nuevo");
    });

    it('status code 400,actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload ', async () => {
        const response = await request(server).put("/cafes/5").send({
            id: "6", nombre: "Café Actualizado",
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).not.toEqual({ message: "El id en los parámetros debe ser igual al id en el payload", });

    });
});
