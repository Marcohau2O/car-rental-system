import PDFDocument from "pdfkit"
import { generarPDFService } from '../services/pdf.service.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

export const generarPDFReserva = asyncHandler(async(req, res) => {
    const id = Number(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID invalido" })
    }
    const reserva = await generarPDFService.getReserva(id)

    if (!reserva) {
        return res.status(404).json({ message: 'Reservación no encontrada' })
    }

    const doc = new PDFDocument({
        size: "A4",
        margin: 50
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=Reserva-${reserva.confirmacion}.pdf`
    );
    
    doc.pipe(res);

    doc
        .fontSize(22)
        .text("Comprobante de Reservación", { align: "center" });

    doc.moveDown();
    doc.fontSize(14).text("Riviera Rentals", { align: "center" });

    doc.moveDown(2);

    doc.fontSize(14).text(`Confirmación: ${reserva.confirmacion}`);
    doc.text(`Cliente: ${reserva.usuario.nombre}`);
    doc.text(`Email: ${reserva.usuario.correo}`);
    doc.text(`Vehículo: ${reserva.auto.marca} ${reserva.auto.modelo}`);
    doc.text(`Inicio: ${new Date(reserva.fechainicio).toLocaleDateString()}`);
    doc.text(`Fin: ${new Date(reserva.fechafin).toLocaleDateString()}`);

    doc.moveDown();

    doc
        .fontSize(16)
        .text(`Total: $${reserva.total}`, { underline: true });

    doc.moveDown(2);

    doc.fontSize(16).text("Datos para Transferencia");

    doc.moveDown();

    doc.fontSize(12).text("Banco: BBVA");
    doc.text("Beneficiario: Riviera Rentals SA de CV");
    doc.text("Cuenta: 0123456789");
    doc.text("CLABE: 012345678901234567");
    doc.text(`Monto a pagar: $${reserva.total}`);
    doc.text(`Referencia: ${reserva.confirmacion}`);

    doc.moveDown(3);

    doc
        .fontSize(10)
        .text(
            "Este documento no es válido como factura. Envíe su comprobante de pago para validar su reservación.",
            { align: "center" }
        );

    doc.end();
})