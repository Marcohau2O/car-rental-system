export const healthCheck = (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "car-rental-api",
        timestamp: new Date().toISOString(),
    });
};