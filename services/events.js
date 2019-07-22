const MongoLib = require("../lib/mongo");

class EventsService {
    constructor() {
        this.collection = "events";
        this.mongoDB = new MongoLib();
    }

    async getEvents({query}) {
        const location = {
            location: {$in: [parseFloat(query.lat), parseFloat(query.lng)]}
        };
        const config = {
            offset: parseInt(query.page) * parseInt(query.limit),
            limit: parseInt(query.limit)
        };
        const events = await this.mongoDB.getLimit(this.collection, location, config);

        return events || [];
    }

    async getEvent({eventId}) {
        const event = await this.mongoDB.get(this.collection, eventId);
        return event || {};
    }

    async createEvent({event}) {
        const createEventId = await this.mongoDB.create(this.collection, event);

        return createEventId;
    }

    async updateEvent({eventId, event}) {
        const updateEventId = await this.mongoDB.update(
            this.collection,
            eventId,
            event
        );

        return updateEventId;
    }

    async updateAttendance({eventId, event}) {
        const updateEventId = await this.mongoDB.update(
            this.collection,
            eventId,
            event
        );

        return updateEventId;
    }

    async deleteEvent({eventId}) {
        const deletedEventId = await this.mongoDB.delete(
            this.collection,
            eventId
        );

        return deletedEventId;
    }
}

module.exports = EventsService;