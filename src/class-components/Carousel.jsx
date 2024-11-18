import { Component } from "react";
import useBreedList from "../hooks/useBreedList";

// React.createClass({}) used to be the way to create a class component

/**
 *! We cannot have hooks or queries in class components
 * Every class component must have a render method that retuns null or JSX
 */
class Carousel extends Component {
  state = {
    active: 0,
  }; // like data() in Vue

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  }; // work automatically if no images are passed

  //# This three are lifecycle methods and they are replaced with `useEffect` in hooks
  componentDidMount() {} // onMounted in Vue
  componentDidUpdate() {} // onUpdated in Vue, runs when state gets updated
  componentWillUnmount() {} // onUnmount in Vue

  // shouldComponentUpdate() {} // return false to prevent re-rendering in some cases to improve performance

  handleIndexClick = (e) => {
    /**
     * # `this` keyowrd now that we use an arrow function is a Carousel component instance.
     *
     * When we invoke an arrow function, it doesn't create a new `this` binding or a new lexical environment for `this`, arguments, super, or new.target,
     * compared to regular functions that create a new execution context (including a new lexical environment) per invocation.
     *
     * How Bryan said it: "When we invoke an arrow function, it doesn't create a new scope, compared to regular functions that create a new scope per invocation."
     *
     * If it was a regular function, it would be `undefined`. It was invoked by an event listener so it doesn't have a context.
     * # Arrow function captures where it was written, so the Component is the context of `this`
     */

    this.setState({
      active: +e.target.dataset.index, // dataset gives us all `data-` attributes, and then we search for `index`
    });
    /**
     * ! setState does an object merge with the current state object (Object.assign)
     */
  };

  render() {
    const { active } = this.state; //# is mutable!!
    const { images } = this.props; //! immutable props

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              data-index={index}
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

//✔️ This is how we can use hooks in class components, by creating a wrapper component that uses the hook, and passes the data to the class component
// React Router also now only supports hooks, so we would have to use a wrapper component in that scenario
function CarouselParent({ animal }) {
  const [breedList] = useBreedList(animal);

  return <Carousel breedList={breedList} />;
}

export default Carousel; // then we would export `CarouselParent` instead of `Carousel`
