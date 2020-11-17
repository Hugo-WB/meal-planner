import React, { useState, useEffect } from "react";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// CSS:
import {
  Container,
  Form,
  Button,
  Segment,
  Grid,
  Radio,
} from "semantic-ui-react";

// Components:
import TopNav from "./../../Components/TopNav/TopNav";
import PlanRecipes from "../../Components/PlanRecipes/PlanRecipes";

// EXTERNAL COMPONENTS:
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

// TYPES/INTERFACES:
import { RootState } from "../../reducers/store";
import { PlanFormInputs, Events, FormattedEvents } from "./../../types";

const Plan = () => {
  const firestore = useFirestore();
  const history = useHistory();

  const [events, setEvents] = useState<Events>([]);
  const intialFormInputs: { [index: string]: boolean } = {
    breakfast: false,
    lunch: true,
    dinner: true,
  };
  const [formInputs, setFormInputs] = useState(intialFormInputs);
  const localUserUID = useSelector(
    (state: RootState) => state.localData.user.uid
  );
  useFirestoreConnect([{ collection: "users", doc: localUserUID }]);
  useFirestoreConnect({
    collection: "recipes",
    where: ["meal", "==", "lunch"],
    storeAs: "lunchRecipes",
  });
  const user = useSelector((state: RootState) => state.firestore.ordered.users);
  const breakfastRecipes = useSelector(
    (state: RootState) => state.firestore.data.breakfastRecipes
  );
  const lunchRecipes = useSelector(
    (state: RootState) => state.firestore.data.lunchRecipes
  );
  const dinnerRecipes = useSelector(
    (state: RootState) => state.firestore.data.dinnerRecipes
  );
  // Check if firestore has events that are already generated.
  useEffect(() => {
    try {
      let tempEvents = user[0].events;
      if (tempEvents !== undefined && events.length < 1) {
        setEvents(tempEvents);
      }
    } catch (error) {}
  }, [user, events.length]);

  // choose random recipes and create the plan
  const generateEvents = (): Events => {
    let events: Events = [];
    let mealTimes: [number, number][][] = [
      [
        [8, 0],
        [9, 0],
      ],
      [
        [12, 0],
        [13, 0],
      ],
      [
        [19, 0],
        [20, 0],
      ],
    ];
    const getRandomMealFromRecipes = (recipes: any) => {
      try {
        recipes = Object.values(recipes);
        if (recipes.length < 1) {
          return {
            name: "No Recipes",
          };
        } else {
          return recipes[Math.floor(Math.random() * recipes.length)];
        }
      } catch (error) {
        return {
          name: "No Recipes",
        };
      }
    };
    for (let day = 0; day < 7; day++) {
      let meals: Events = [];
      if (formInputs.breakfast) {
        meals.push({
          title: getRandomMealFromRecipes(breakfastRecipes).name,
          start: mealTimes[0][0],
          end: mealTimes[0][1],
          weekDay: day,
        });
      }
      if (formInputs.lunch) {
        meals.push({
          title: getRandomMealFromRecipes(lunchRecipes).name,
          start: mealTimes[1][0],
          end: mealTimes[1][1],
          weekDay: day,
        });
      }
      if (formInputs.dinner) {
        meals.push({
          title: getRandomMealFromRecipes(dinnerRecipes).name,
          start: mealTimes[2][0],
          end: mealTimes[2][1],
          weekDay: day,
        });
      }
      events = events.concat(meals);
    }

    if (localUserUID !== undefined) {
      firestore
        .collection("users")
        .doc(localUserUID)
        .update({
          events: events,
          meals: formInputs,
        })
        .then(() => {
          console.log("successfull, added events to firestore");
          setEvents(events);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("please login");
      history.push("/");
    }
    return events;
  };

  // Takes events and formats them for the calendar
  const getFormattedEvents = (unformatted: Events): FormattedEvents => {
    let output: any[] = [];
    let now = new Date();
    let dayOfWeek = (now.getDay() + 6) % 7;

    for (let event = 0; event < unformatted.length; event++) {
      let dayDate = new Date();
      dayDate.setDate(now.getDate() - dayOfWeek + unformatted[event].weekDay);
      let startTime = new Date(
        dayDate.setHours(
          unformatted[event].start[0],
          unformatted[event].start[1],
          0,
          0
        )
      );
      let endTime = new Date(
        dayDate.setHours(
          unformatted[event].end[0],
          unformatted[event].end[1],
          0,
          0
        )
      );
      let formattedEvent = {
        title: unformatted[event].title,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      };

      output = output.concat(formattedEvent);
    }
    return output;
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>, data: any) => {
    const value: string = data.value;
    setFormInputs((prevFormInputs) => {
      return {
        ...prevFormInputs,
        [value]: !prevFormInputs[value.toString()],
      };
    });
  };

  const form = (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ marginTop: "30px", maxWidth: "600px" }}>
        <Segment stacked>
          <Form>
            <Form.Group inline widths="equal">
              <label>Meals</label>
              <Form.Radio
                label="breakfast"
                value="breakfast"
                checked={formInputs.breakfast}
                onClick={handleChange}
              />
              <Form.Radio
                label="lunch"
                value="lunch"
                checked={formInputs.lunch}
                onClick={handleChange}
              />
              <Form.Radio
                label="dinner"
                value="dinner"
                checked={formInputs.dinner}
                onClick={handleChange}
              />
            </Form.Group>
            <Button color="teal" onClick={generateEvents}>
              Generate
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );

  const [numberOfClicks,setNumberOfClicks] = useState(0)
  const [modalRecipe,setModalRecipe] = useState({
    name:"",
    imageSrc:"",
    description:"",
    ingredients:[""],
    steps:"",
    author:"",
  });
  const handleCalendarClick = (click:any) => {
    firestore.collection("recipes").doc(click.event.title).get().then((doc)=>{
      if (doc.exists){
        const docData = doc.data()
        if (docData !== undefined){
          setModalRecipe({
            name: docData.name,
            imageSrc: docData.imageSrc,
            description: docData.description,
            ingredients: docData.ingredients,
            steps: docData.steps,
            author: docData.author,
          })
          setNumberOfClicks(numberOfClicks+1)
        }
      }
    }).catch((error)=>{
      console.log(error)
    })

  };
  const calendar = (
    <Container style={{ marginTop: "20px", height: "90vh" }}>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={getFormattedEvents(events)}
        firstDay={1}
        height={"100%"}
        eventClick={(click) => handleCalendarClick(click)}
      />
    </Container>
  );

  return (
    <div>
      <TopNav />
      {events.length < 1 ? "" : calendar}
      {form}
      {(modalRecipe.name !=="")?<PlanRecipes clicks = {numberOfClicks} recipe={modalRecipe} />: ""}
    </div>
  );
};
export default Plan;
