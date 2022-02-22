import React from 'react';
import { Modal } from 'react-bootstrap';
import { ArrowClockwise, BarChartSteps, Clock } from 'react-bootstrap-icons';

interface PopUpProps {
    show: boolean;
    title: string;
    cardImage: string;
    description: string;
    publisher: string;
    hide: () => void;
}

interface PopUpState {
    show: boolean;
}

export class PopUp extends React.Component<PopUpProps, PopUpState>{
    constructor(props: PopUpProps) {
        super(props)
        this.state = { show: false }
    }

    render() {
        return (
            <>
                <Modal id="modal" show={this.props.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={this.props.hide}>
                    <Modal.Body>
                        <div className="card" >
                            <img className="img-thumbnail" src={`${this.props.cardImage}`} alt="Card  cap" />
                            <div className="card-body">
                                <blockquote className="blockquote justify-content-start">
                                    <span><h6>Welcome To</h6></span>
                                    <h4>{this.props.title}</h4>
                                    {this.props.description}
                                </blockquote>
                                <hr />
                                <div className="col-12 col-md-6 col-lg-12 d-flex flex-column">
                                    <div className="container flex-grow-1 min-width-0">
                                        <div className='row'>
                                            <div className='col-12'>
                                                <span ><Clock className='mr-2' /> Learning time: </span><span>1 hour</span>
                                            </div>
                                            <div className='col-12'>
                                                <span > <BarChartSteps className='mr-2' /> Difficulty: </span><span>Beginner</span>
                                            </div>
                                            <div className='col-12'>
                                                <span><ArrowClockwise className='mr-2' />2022 by {this.props.publisher}</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="container mt-2">
                                        <div className="row ">
                                            <div className="col-12">
                                                <button type="button" className='btn btn-success mr-2'  > Create a free Account</button>
                                                <button type="button" className='btn btn-primary mr-2'  > Login</button>
                                                <button type="button" className='btn btn-danger mr-2' onClick={this.props.hide}> Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal >
            </>)
    }

}

export default PopUp;