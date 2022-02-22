import React from "react";
import "./CoursesPage.scss";
import CourseCard from "../../user-interface/components/CourseCard";
import { CourseSearchResultList } from '../../web-service/models/CourseSearchResultList';
import "react-multi-carousel/lib/styles.css";
import noImage from '../../noImage.png';
import logoFile from '../../logoFile.svg';
import festo from '../../festo.svg';
import { Search } from "react-bootstrap-icons";


interface CoursesPageProperties {
}

interface CoursesPageState {
	courseSerachState: CourseSearchResultList;
	serachText: string;
	prevState: CourseSearchResultList;
}

class CoursesPage extends React.Component<CoursesPageProperties, CoursesPageState> {

	constructor(props: CoursesPageProperties) {
		super(props);
		this.state = {
			courseSerachState: { publicLearningPathResults: [], count: 0 }, serachText: "",
			prevState: { publicLearningPathResults: [], count: 0 }
		}
	}


	//Please start the proxy url using npm run proxy before npm start
	// This compoenet wraps all the card section and search bar and nav bar

	componentDidMount() {
		fetch('http://localhost:8010/proxy/SearchService/api/search/learning-paths/public?&page=3&size=12&sortOrder=2')
			.then(response => response.json() as Promise<CourseSearchResultList>)
			.then(data => {
				this.setState({ courseSerachState: data, prevState: data });

			}).catch(function (error) {
				console.log(error);
			});
	}

	onChangeSerach = (event: any) => {
		//onchange event we are triggering the search api
		if (event.target.value !== "") {
			this.setState({ serachText: event.target.value });
			fetch(`http://localhost:8010/proxy/SearchService/api/search/learning-paths/public?q=${this.state.serachText}&page=1&size=12&sortOrder=1`)
				.then(response => response.json() as Promise<CourseSearchResultList>)
				.then(data => {
					this.setState({ courseSerachState: data });
					console.log(data)
				}).catch(function (error) {
					console.log(error);
				});
		}
		else {
			this.setState({ courseSerachState: this.state.prevState, serachText: event.target.value });

		}

	}

	public render(): JSX.Element {


		return (
			<>
				{/* Top Bar */}
				<div className="container">
					
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<a className="navbar-brand" href="/">
							<img className="navbar-brand" src={logoFile} alt="None" />
							Learning Experience
						</a>
						<a className="navbar-brand ml-auto " href="/">
							<img className="navbar-brand  logo-height" src={festo} alt="None" />
						</a>
					</nav>
				</div>
				{/* Search */}
				<div className="main">
					<div className="form-group has-search">
						<span className="form-control-feedback"><Search color="royalblue" /></span>
						<input type="search" id="form1" className="form-control" autoComplete="off" placeholder=" Search Courses " name="search" onChange={(e) => { this.onChangeSerach(e) }} value={this.state.serachText} />
					</div>
				</div>
				{/* CardDesign */}
				{this.state.courseSerachState.publicLearningPathResults.length > 0 ?
					<>
						<section className="container py-3" id="courses">
							<div className="alert alert-success" role="alert">
								Available Courses
							</div>
							<div className="row">
								{this.state.courseSerachState.publicLearningPathResults.map((item, index) => {
									return <div className="col-sm-4 col-lg-4 mb-3" key={index + item.id.toString()} >
										<CourseCard course={item} user={item.publisher ? item.publisher.name : ""} thumbnail={item.images ? item.images.thumbnail : noImage} digitalCover={item.images ? item.images.digitalCover : noImage} />
									</div>
								})}

							</div>
						</section>
					</>
					:	
					<div className="alert alert-danger" role="alert">
						{/* This section helps to dispaly if no records found */}
						No result found for {`${this.state.serachText}`}
					</div>
				}

			</>
		);
	}
}

export default CoursesPage;
