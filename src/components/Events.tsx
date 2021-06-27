import React, {Component} from 'react';

type LocationEventState = {
    latitude: number,
    longitude: number
    events: Array<{name: string, date:string, urlLink:string}>
}

type  AcceptedProps= {

}

class Events extends Component<AcceptedProps, LocationEventState>{
    constructor(props:AcceptedProps){
        super(props)
        this.state = {
            latitude:0,
            longitude: 0,
            events: [{
                name:'',
                date:'',
                urlLink: ''
            }]
        }
   
    }

    location() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude);
            this.setState({
                latitude:position.coords.latitude, 
                longitude:position.coords.longitude},() => {this.getEvents()})
                })
        }
    
    componentDidMount(){
        this.location();
        }
    
    
    getEvents( ){
        let latlon = this.state.latitude + "," + this.state.longitude
        let url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=iA6kcEAWWSkkXBsdauUu5N3EXYO7lYDE&latlong="+latlon
        fetch(url)
        .then (res => res.json())
        .then(result => {
            let results = result._embedded.events
            
            this.setState({events:results.map((eventObj: {name:string, dates:{start:{localDate:string}}, url:string})=>{
                return(
                    {
                    name: eventObj.name,
                    date: eventObj.dates.start.localDate,
                    urlLink: eventObj.url
                    }
                )
            }) 
                

            }, () => {console.log(this.state.events)
            })
            })          
        .catch(err => console.log (err))}
    
    
    render(){
        return(
            <div>
            <table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Ticket Link</th>
                    </tr>
                </thead>
                <tbody>
                   {this.state.events.map((ticket, index)=>{
                       return(
                           <tr key = {index}>
                               <td>{ticket.name}</td>
                               <td>{ticket.date}</td>
                               <td><a href={ticket.urlLink} target = "blank">Tickets</a></td>
                           </tr>
                       )
                   })} 
                </tbody>

            </table>
                
            </div>
        )
    }
} 

export default Events;

