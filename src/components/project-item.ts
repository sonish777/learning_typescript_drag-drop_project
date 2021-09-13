import { Autobind } from "../decorators/autobind.js";
import { Draggable } from "../models/drag-drop.js";
import { Project, ProjectStatus } from "../models/project.js";
import { Component } from "./base-component.js";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    return this.project.people === 1
      ? "1 person"
      : `${this.project.people} persons`;
  }

  constructor(project: Project) {
    super(
      "single-project",
      `${ProjectStatus[project.status].toLowerCase()}-projects-list`,
      false,
      project.id
    );
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer?.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @Autobind
  dragEndHandler(_: DragEvent) {
    console.log("Drag end");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
