import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class EventsController {
    public async index(ctx: HttpContextContract){
        return Event.all(); 

    }   
    
    public async selectById({params}: HttpContextContract){
        const eventView=await Event.findBy('id',params.id)
        if(!eventView){
          return 'the record not exixt'
        }
        return eventView;
        
    }

    public async store({request}: HttpContextContract){
        
        const newEventSchema = schema.create({
            title: schema.string(),
            eventDate: schema.date(),
            time:schema.string(),
            place:schema.string()
        })

        const payload =await request.validate({ schema: newEventSchema});

        const events = await Event.create(payload);
        return events;
      } 
      public async show({params}: HttpContextContract){
        return Event.findOrFail(params.id);

    } 
    public async update({ params, request}: HttpContextContract){
        const body= request.body();
       
        const events = await Event.findByOrFail('id', params.id);

        events.title=body.title
        events.eventDate=body.eventDate
        events.time=body.time
        events.place=body.place
        await events.save();
        return events;
    }
    public async delete({ params }: HttpContextContract) {
        const events = await Event.findByOrFail('id', params.id);
        await events.delete();
        return 'Event deleted successfully';
      }

}
