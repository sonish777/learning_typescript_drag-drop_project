import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { Validatable, validate } from "../util/validation.js";
import { Component } from "./base-component.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  public configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  public renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const titleText = this.titleInputElement.value;
    const descriptionText = this.descriptionInputElement.value;
    const peopleNumber = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: titleText,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: descriptionText,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +peopleNumber,
      required: true,
      min: 0,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try againn!");
      return;
    }
    return [titleText, descriptionText, +peopleNumber];
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInput();
    }
  }
}
