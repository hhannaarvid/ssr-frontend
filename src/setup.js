import database from "../db/database.js";

try {
    await database.reset();
} catch (err) {
    console.error("Fel vid återställning:", err);
}
