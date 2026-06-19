async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";

    // trips=MUM-DEL
    if (query.trips) {

        const [departureAirportId, arrivalAirportId] = query.trips.split("-");

        // Check that departure and arrival airports are different
        if (departureAirportId === arrivalAirportId) {
            throw new AppError(
                "Departure and arrival airports cannot be the same",
                StatusCodes.BAD_REQUEST
            );
        }

        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
        const [minPrice, maxPrice] = query.price.split("-");

        customFilter.price = {
            [Op.between]: [
                minPrice,
                maxPrice === undefined ? 20000 : maxPrice
            ]
        };
    }

    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        };
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [
                query.tripDate,
                query.tripDate + endingTripTime
            ]
        };
    }

    if (query.sort) {
        const params = query.sort.split(",");
        sortFilter = params.map((param) => param.split("_"));
    }

    console.log(customFilter, sortFilter);

    try {
        const flights = await flightRepository.getAllFlights(
            customFilter,
            sortFilter
        );
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError(
            "Cannot fetch data of all the flights",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}