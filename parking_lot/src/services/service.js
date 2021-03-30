const Parking = require("../models/parkingLot");
const Ticket = require("../models/ticket");

exports.CreateParking = async (body) => {
    try {
        return await Parking.insertMany(body);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.FindParkingSlots = async (body) => {
    try {
        const {vehicleType, floorNumber} = body;
        const query = {
            vehicleType, status: `unoccupied`
        }

        if(floorNumber) {
            query.floorNumber = floorNumber;
        }
        return await Parking.find(query);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.FindOccupiedParkingSlots = async (body) => {
    try {
        const {vehicleType, floorNumber} = body;
        const query = {
            vehicleType, status: `occupied`
        }

        if(floorNumber) {
            query.floorNumber = floorNumber;
        }
        return await Parking.find(query);
    } catch (err) {
        throw new Error (err.message)
    }
}

const findEmptySlot = async (vehicleType) => {
    return await Parking.findOne({vehicleType, status: `unoccupied`});
}

exports.BookASlot = async (body) => {
    try {
        const slot = await findEmptySlot(body.vehicleType);
        if(!slot) {
            throw new Error(`No slots available for this vehicle`)
        }
        body.floorNumber = slot.floorNumber;
        body.slotNumber = slot.slotNumber;
        body.status = `in_parking`;
        await Ticket.create(body);
        await Parking.update({floorNumber: body.floorNumber, slotNumber:body.slotNumber},
            {$set:{status: 'occupied'}});
        const response = {
            ticketNumber : `${slot.parkingLotId}_${slot.floorNumber}_${slot.slotNumber}`
        }
        return response;
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.unparkVehicle = async (body) => {
    const parkingDetails = body.ticketNumber.split('_');

    const checkParkingStatus = await Ticket.find({floorNumber: parkingDetails[1], slotNumber:parkingDetails[2]})
                                           .sort({inTime : -1}).limit(1)
    console.log(checkParkingStatus)
    if(checkParkingStatus.length === 0 ){
        throw new Error (`The ticket is invalid`);
    }
    if(checkParkingStatus[0] && checkParkingStatus[0].status == 'out_parking') {
        throw new Error (`The slot is already empty. Last vehicle parket here was ${checkParkingStatus[0].vehicleNumber}`);
    }

    await Ticket.update({floorNumber: parkingDetails[1], slotNumber:parkingDetails[2], status: 'in_parking' },
        {$set:{status: 'out_parking', outTime: Date.now()}});

    await Parking.update({floorNumber: parkingDetails[1], slotNumber:parkingDetails[2]},
        {$set:{status: 'unoccupied'}});

    return `Unparked the vehicle`;
}
