import "../../packages/viewmotion/src/styles.css";
import { initMotion } from "../../packages/viewmotion/src/index";

const { scroll } = initMotion();

// Access the Lenis instance for programmatic control:
// scroll?.scrollTo('#section', { offset: -80 })
// scroll?.on('scroll', ({ progress }) => console.log(progress))
