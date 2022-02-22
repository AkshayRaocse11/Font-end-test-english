import React from "react";
import "./CourseCard.scss";
import { CourseSearchResult } from "../../web-service/models/CourseSearchResultList";
import "react-multi-carousel/lib/styles.css";
import { PopUp } from './PopUp';

interface CourseCardProperties {
	course: CourseSearchResult;
	thumbnail: string;
	digitalCover: string;
	user: string;
}

interface CourseCardState {
	showPopUp: boolean;
}

// This component helps us to display the set of cards
class CourseCard extends React.Component<CourseCardProperties, CourseCardState> {

	constructor(props: any) {
		super(props);
		this.state = { showPopUp: false }
	}

	showPopUpModal = (event: any) => {
		this.setState({ showPopUp: !this.state.showPopUp })
	}

	modalClose = () => {
		this.setState({ showPopUp: false })
	};
	public render(): JSX.Element {
		return (
			<>
				{/* Card Body Section */}
				<div className="card shadow border-0">
					<img className="card-img-top" src={`${this.props.thumbnail}`} alt="Not Found" />
					<div className="card-body">
						<div className="card-text-container">
							<div className="card-title">{`${this.props.course.name}`}</div>
							<div className="card-text description">
								<p className="text-grey">{`${this.props.user}`}</p>
							</div>
						</div>
						<button className=" btn btn-link btn-showmore float-end"
							onClick={(e) => { this.showPopUpModal(e) }}>Show More</button>
					</div>
				</div>
				{/* Helps to open Show More PopPup */}
				<PopUp
					show={this.state.showPopUp}
					publisher={this.props.user}
					title={this.props.course ? this.props.course.name : ''}
					description={this.props.course ? this.props.course.description : ''}
					cardImage={this.props.digitalCover}
					hide={this.modalClose}
				></PopUp>


			</>

		);
	}
}

export default CourseCard;
