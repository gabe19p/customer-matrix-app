const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const Base = require("../models/Base");
const Unit = require("../models/Unit");

/**
 * @openapi
 * /api/locations:
 *   get:
 *     tags:
 *       - Location
 *     description: Get all locations
 *     responses:
 *       '200':
 *         description: All locations found
 *       '500':
 *         description: Server error
 *       '501':
 *         description: MongoDB error
 */
router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

/**
 * @openapi
 * /api/locations:
 *   post:
 *     tags:
 *       - Location
 *     description: Create a new location
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Location created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
router.post("/locations", async (req, res) => {
  const { name } = req.body;

  // Validate that the name is provided
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }

  try {
    let locationData = { name };

    await Location.create(locationData)
      .then((createdLocation) => {
        console.log(`Locations created: ${req.name}`);
        res.status(201).json(createdLocation);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

/**
 * @openapi
 * /api/locations/{id}:
 *   put:
 *     tags:
 *       - Location
 *     description: Update a location by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the location to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Okinawa"
 *     responses:
 *       '200':
 *         description: Location updated successfully
 *       '404':
 *         description: Location not found
 *       '500':
 *         description: Server error
 */
router.put("/locations/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const location = await Location.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

/**
 * @openapi
 * /api/locations/{id}:
 *   delete:
 *     tags:
 *       - Location
 *     description: Delete a location by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the location to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Location deleted successfully
 *       '404':
 *         description: Location not found
 *       '500':
 *         description: Server error
 */
router.delete("/locations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findByIdAndDelete(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

// Similar CRUD for Base
/**
 * @openapi
 * /api/bases:
 *   get:
 *     tags:
 *       - Base
 *     description: Get all bases
 *     responses:
 *       '200':
 *         description: All bases found
 *       '500':
 *         description: Server error
 */
router.get("/bases", async (req, res) => {
  try {
    const bases = await Base.find();
    res.status(200).json(bases);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

/**
 * @openapi
 * /api/bases:
 *   post:
 *     tags:
 *       - Base
 *     description: Create a new base using locationName
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               locationName:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Base created successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Location not found
 *       '500':
 *         description: Server error
 */
router.post("/bases", async (req, res) => {
  const baseData = {
    name: req.body.name,
    locationName: req.body.locationName,
  };

  try {
    await Base.create(baseData)
      .then((createdBase) => {
        console.log(`Base created! ${createdBase}`);
        res.status(201).json(createdBase);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });

    // Send the newly created base as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

/**
 * @openapi
 * /api/bases/{id}:
 *   delete:
 *     tags:
 *       - Base
 *     description: Delete a base by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the base to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Base deleted successfully
 *       '404':
 *         description: Base not found
 *       '500':
 *         description: Server error
 */
router.delete("/bases/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const base = await Base.findByIdAndDelete(id);
    if (!base) {
      return res.status(404).json({ message: "Base not found" });
    }
    res.status(200).json({ message: "Base deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

//
// Similar CRUD for Unit
//
/**
 * @openapi
 * /api/units:
 *   get:
 *     tags:
 *       - Unit
 *     description: Get all units
 *     responses:
 *       '200':
 *         description: All units found
 *       '500':
 *         description: Server error
 */
router.get("/units", async (req, res) => {
  try {
    const units = await Unit.find();
    res.status(200).json(units);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

/**
 * @openapi
 * /api/units:
 *   post:
 *     tags:
 *       - Unit
 *     description: Create a new unit using baseName
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "123 Sq"
 *               baseName:
 *                 type: string
 *                 example: "Kadena AB"
 *               locationName:
 *                 type: string
 *                 example: "Okinawa"
 *     responses:
 *       '201':
 *         description: Unit created successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Base not found
 *       '500':
 *         description: Server error
 */
router.post("/units", async (req, res) => {
  try {
    // Create the unit with the found base's ID
    const unitData = {
      name: req.body.name,
      baseName: req.body.baseName,
      locationName: req.body.locationName,
    };

    await Unit.create(unitData)
      .then((createdUnit) => {
        console.log(`Unit create: ${createdUnit}`);
        res.status(201).json(createdUnit);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Error: ${err}`,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

/**
 * @openapi
 * /api/units/{id}:
 *   put:
 *     tags:
 *       - Unit
 *     description: Update a unit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the unit to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Air Force"
 *     responses:
 *       '200':
 *         description: Unit updated successfully
 *       '404':
 *         description: Unit not found
 *       '500':
 *         description: Server error
 */
router.put("/units/:id", async (req, res) => {
  const { id } = req.params;
  const { name, baseId } = req.body;
  try {
    const unit = await Unit.findByIdAndUpdate(
      id,
      { name, base: baseId },
      { new: true }
    );
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    res.status(200).json(unit);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

/**
 * @openapi
 * /api/units/{id}:
 *   delete:
 *     tags:
 *       - Unit
 *     description: Delete a unit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the unit to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Unit deleted successfully
 *       '404':
 *         description: Unit not found
 *       '500':
 *         description: Server error
 */
router.delete("/units/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await Unit.findByIdAndDelete(id);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Server Error: ${err.message}` });
  }
});

module.exports = router;
