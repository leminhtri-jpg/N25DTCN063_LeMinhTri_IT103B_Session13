
const tickets = [
    {
        pnr: "VN001",
        passengerName: "Nguyen Van An",
        flight: "VN200",
        seat: "12A",
        ticketClass: "ECONOMY",
        baggageKg: 25,
        status: "BOOKED",
        fee: 0
    },
    {
        pnr: "VN002",
        passengerName: "Tran Thi Mai",
        flight: "VN300",
        seat: "2B",
        ticketClass: "BUSINESS",
        baggageKg: 20,
        status: "BOOKED",
        fee: 0
    },
    {
        pnr: "VN003",
        passengerName: "Le Van Binh",
        flight: "VN200",
        seat: "15C",
        ticketClass: "ECONOMY",
        baggageKg: 18,
        status: "BOOKED",
        fee: 0
    }
];

const ECONOMY_LIMIT = 20;
const BUSINESS_LIMIT = 30;
const EXCESS_FEE_PER_KG = 50000;

// Tìm vé theo mã PNR
function findTicketByPnr(pnr) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].pnr === pnr) {
            return tickets[i];
        }
    }

    return null;
}

function calculateExcessBaggageFee(ticketClass, baggageKg) {
    let freeLimit = 0;
    if (ticketClass === "ECONOMY") {
        freeLimit = ECONOMY_LIMIT;
    } else if (ticketClass === "BUSINESS") {
        freeLimit = BUSINESS_LIMIT;
    } else {
        return -1;
    }

    if (baggageKg < 0) {
        return -1;
    }

    let excessKg = baggageKg - freeLimit;

    if (excessKg < 0) {
        excessKg = 0;
    }

    return excessKg * EXCESS_FEE_PER_KG;
}

function listTickets() {
    console.log("========== DANH SÁCH VÉ ==========");
    console.log("PNR | Hành khách | Chuyến bay | Hạng | Hành lý | Trạng thái");
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        console.log(
            ticket.pnr + " | " +
            ticket.passengerName + " | " +
            ticket.flight + " | " +
            ticket.ticketClass + " | " +
            ticket.baggageKg + " kg | " +
            ticket.status
        );
    }
}

function searchTicket() {
    const keyword = prompt("Nhập mã PNR hoặc tên hành khách:");
    if (keyword === null || keyword.trim() === "") {
        console.log("Dữ liệu tìm kiếm không hợp lệ!");
        return;
    }

    const searchValue = keyword.trim().toLowerCase();
    let found = false;
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        if (
            ticket.pnr.toLowerCase() === searchValue ||
            ticket.passengerName.toLowerCase().includes(searchValue)
        ) {
            console.log(ticket);
            found = true;
        }
    }

    if (found === false) {
        console.log("Không tìm thấy vé!");
    }
}

function displayBoardingPass(ticket) {
    console.log("======= BOARDING PASS =======");
    console.log("Mã PNR: " + ticket.pnr);
    console.log("Hành khách: " + ticket.passengerName);
    console.log("Chuyến bay: " + ticket.flight);
    console.log("Ghế: " + ticket.seat);
    console.log("Hạng vé: " + ticket.ticketClass);
    console.log("Hành lý: " + ticket.baggageKg + " kg");
    console.log("Phí quá cân: " + ticket.fee.toLocaleString("vi-VN") + " VNĐ");
    console.log("Trạng thái: " + ticket.status);
}

function checkIn() {
    const pnrInput = prompt("Nhập mã PNR cần check-in:");

    if (pnrInput === null || pnrInput.trim() === "") {
        console.log("Mã PNR không hợp lệ!");
        return;
    }

    const ticket = findTicketByPnr(pnrInput.trim().toUpperCase());

    if (ticket === null) {
        console.log("Không tìm thấy vé!");
        return;
    }

    if (ticket.status !== "BOOKED") {
        console.log("Vé không ở trạng thái BOOKED, không thể check-in!");
        return;
    }

    const baggageInput = prompt("Nhập cân nặng hành lý (kg):");

    if (baggageInput === null || baggageInput.trim() === "") {
        console.log("Cân nặng không hợp lệ!");
        return;
    }

    const baggageKg = Number(baggageInput);

    if (!Number.isFinite(baggageKg) || baggageKg < 0) {
        console.log("Cân nặng phải là số không âm!");
        return;
    }

    const fee = calculateExcessBaggageFee(
        ticket.ticketClass,
        baggageKg
    );

    if (fee === -1) {
        console.log("Hạng vé không hợp lệ!");
        return;
    }

    ticket.baggageKg = baggageKg;
    ticket.fee = fee;
    ticket.status = "CHECKED_IN";

    console.log("Check-in thành công!");
    console.log("Phí hành lý quá cân: " + fee.toLocaleString("vi-VN") + " VNĐ");

    displayBoardingPass(ticket);
}

function cancelTicket() {
    const pnrInput = prompt("Nhập mã PNR cần hủy:");

    if (pnrInput === null || pnrInput.trim() === "") {
        console.log("Mã PNR không hợp lệ!");
        return;
    }

    const ticket = findTicketByPnr(pnrInput.trim().toUpperCase());

    if (ticket === null) {
        console.log("Không tìm thấy vé!");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Vé này đã bị hủy!");
        return;
    }

    ticket.status = "CANCELLED";

    console.log("Hủy vé thành công!");
    console.log(ticket);
}

function main() {
    let menuChoice;

    do {
        console.log("\n===== QUẢN LÝ VÉ MÁY BAY =====");
        console.log("1. Xem danh sách vé");
        console.log("2. Check-in và tính phí hành lý");
        console.log("3. Tra cứu vé");
        console.log("4. Hủy vé");
        console.log("5. Thoát");

        const input = prompt("Nhập lựa chọn từ 1 đến 5:");

        if (input === null) {
            menuChoice = "5";
        } else {
            menuChoice = input.trim();
        }

        switch (menuChoice) {
            case "1":
                listTickets();
                break;

            case "2":
                checkIn();
                break;

            case "3":
                searchTicket();
                break;

            case "4":
                cancelTicket();
                break;

            case "5":
                console.log("Đã thoát chương trình.");
                break;

            default:
                console.log("Lựa chọn không hợp lệ! Vui lòng nhập từ 1 đến 5.");
        }
    } while (menuChoice !== "5");
}

main();
