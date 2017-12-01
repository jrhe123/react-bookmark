import React, { Component } from 'react';

// Components
import { Loading } from '../presentation';

// Helpers
import { APIManager } from '../../utils';

// Constants
import constants from '../../constants';

// Libraries
import Iframe from 'react-iframe';
import Dropzone from 'react-dropzone';
import Collapsible from 'react-collapsible';
import uuidv1 from 'uuid/v1';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import HardwarePhoneIphone from 'material-ui/svg-icons/hardware/phone-iphone';
import HardwareTabletMac from 'material-ui/svg-icons/hardware/tablet-mac';
import HardwareDesktopMac from 'material-ui/svg-icons/hardware/desktop-mac';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

// redux
import actions from '../../actions';
import { connect } from 'react-redux';


class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			SnackOpen: false,
			SnackCorrect: false,
			SnackMessage: '',
			IsSelected: false,
			SourceFileID: null,
			IsCreateSection: false,
			NewSectionTitle: '',
			IsCreatingDoc: false,
			PreviewIdx: null,
			PreviewOpen: false,
			PreviewSection: {},
			ExportOpen: false,
			ExportUrl: null
		};
		this.onDrop = this.onDrop.bind(this);
		this.handleCreateSection = this.handleCreateSection.bind(this);
	}

	handleSnackClose(){
		this.setState({
			SnackOpen: false,
		});
	};

	onDrop(files) {

		if(files.length){

			let updated = Object.assign({}, this.state);
			updated.IsCreatingDoc = true;
			this.setState(updated);
			
			let url = constants.API_ROOT + '/api/upload_source_doc';
			let data = new FormData();
			data.append('UploadFile', files[0]);
			APIManager.upload(url, data, (error, response) => {
				if(error){
					alert('Error: ' + JSON.stringify(error.Message));
					return;
				}
				let { FileId } = response.Response;

				let updated = Object.assign({}, this.state);
				updated.IsSelected = true;
				updated.IsCreatingDoc = false;
				updated.SourceFileID = FileId;
				this.setState(updated);
			});
		}
	}
	
	handleCreateSection(e){
		e.preventDefault();
		if (e.keyCode == 13 && !this.state.IsCreatingDoc) {

			e.target.blur();
			let val = e.target.value;
			if(val === '' || !val){
				this.setState({
					SnackOpen: true,
					SnackCorrect: false,
					SnackMessage: 'Title cannot be empty'
				});
				return;
			}

			this.setState({
				IsCreatingDoc: true
			});
			let url = constants.API_ROOT + '/api/create_empty_doc';
			APIManager.post(url, null, (error, response) => {
				if(error){
					alert('Error: ' + JSON.stringify(error.Message));
					return;
				}

				let { FileId } = response.Response;
				let sectionItem = {
					Title: val,
					FileId: FileId
				};

				this.props.docCreated(sectionItem);

				let updated = Object.assign({}, this.state);
				updated.IsCreateSection = true;
				updated.IsCreatingDoc = false;
				updated.NewSectionTitle = '';
				this.setState(updated);
			});		
		}
	}

	handleFocusCard(idx){
		let previewIdx = this.state.PreviewIdx;
		if(idx != previewIdx){
			this.setState({
				PreviewIdx: idx
			})
		}else{
			this.setState({
				PreviewIdx: null
			})
		}
	}

	handlePreview(){
		let previewIdx = this.state.PreviewIdx;
		if(previewIdx == null){
			this.setState({
				SnackOpen: true,
				SnackCorrect: false,
				SnackMessage: 'Please select a section to preview'
			});
			return;
		}
		let previewSection = this.props.sectionList[previewIdx];
		this.setState({
			PreviewOpen: true,
			PreviewSection: previewSection
		});
	}

	handlePreviewClose(){
		this.setState({PreviewOpen: false});
	};

	handleExport(){

		if(!this.props.sectionList.length){
			this.setState({
				SnackOpen: true,
				SnackCorrect: false,
				SnackMessage: 'Please create a section to export'
			});
			return;
		}

		let url = constants.API_ROOT + '/api/generate_qrcode';
		let params = {
			Data: this.props.sectionList
		};

		APIManager.post(url, params, (error, response) => {
			if(error){
				alert('Error: ' + JSON.stringify(error.Message));
				return;
			}

			let qrUrl = response.Response.ImageUrl;

			let updated = Object.assign({}, this.state);
			updated.ExportUrl = qrUrl;
			updated.ExportOpen = true;
			this.setState(updated);
		});	
	}

	handleExportClose(){
		this.setState({ExportOpen: false});
	};

	render(){

		const { 
			mainContainer,
			controlContainer,
			globalLoadContainer,
			globalLoader,
			previewContainer,
			firstContainer,
			firstBig,
			firstSmall,
			secondContainer,
			secondBig,
			secondSmall,
			focusContainer,
			iconStyle,
			activeIconStyle,
			sectionContainer,
			iphoneContainer,
			iphoneViewer,
			qrcode,
		} = styles;

		return(
			<Card style={mainContainer}>
				{
					this.state.IsCreatingDoc ?
					(
						<div style={globalLoadContainer}>
							<div style={globalLoader}><Loading /></div>
						</div>
					)
					:
					(null)
				}
				<CardHeader
					style={{position: 'relative'}}
					title="Organization"
					subtitle="demo.digitalxi.com"
					avatar={
						<ActionAccountCircle
							hoverColor={blue500}
							style={{width: 40, height: 40, cursor: 'pointer'}}/>
					}
					/>
					<div style={controlContainer}>
						<RaisedButton label="Preview" 
										primary={true} 
										style={{marginRight: 12}}
										onClick={() => this.handlePreview()}
						/>	
						<RaisedButton label="Export" 
										primary={true} 
										onClick={() => this.handleExport()}
						/>
					</div>
				<Divider />	
				
				<div style={(!this.state.IsCreateSection) ? 
						Object.assign({}, firstContainer, firstBig) 
						: 
						Object.assign({}, firstContainer, firstSmall)
						}>
					{
						this.state.IsSelected ? 
						(<CardTitle title="Overview" />)
						:
						(<CardTitle title="Drag & Drop" />)
					}
					{
						this.state.IsSelected ? 
						(
							<Card style={previewContainer}>
								<Iframe 
									url={`https://drive.google.com/open?id=${this.state.SourceFileID}`}
									width="100%"
									height="556px"
									className="myClassname"
									display="initial"
									position="relative"
									allowFullScreen/>
							</Card>	
						)
						:
						(
							<Dropzone 
								onDrop={(files) => this.onDrop(files)}>
							</Dropzone>	
						)
					}
					{
						(!this.state.IsCreateSection)?
						(<HardwareKeyboardArrowLeft
							onClick={() => this.setState({IsCreateSection: true})}
							hoverColor={blue500}
							style={{position: 'absolute', right: -12, top: -12, border: '2px solid #000', borderRadius: '50%', cursor: 'pointer'}} />
						)
						:
						(<HardwareKeyboardArrowRight
							onClick={() => this.setState({IsCreateSection: false})}
							hoverColor={blue500}
							style={{position: 'absolute', right: -12, top: -12, border: '2px solid #000', borderRadius: '50%', cursor: 'pointer'}} />)
					}
				</div>

				<div style={(!this.state.IsCreateSection) ? 
					Object.assign({}, secondContainer, secondSmall)
					:
					Object.assign({}, secondContainer, secondBig)
					}>
					<CardTitle title="Sections" />
					
					<div style={{paddingLeft: 12}}>
						<HardwarePhoneIphone
							hoverColor={blue500}
							style={Object.assign({}, iconStyle, activeIconStyle)} />
						<HardwareTabletMac
							hoverColor={blue500}
							style={iconStyle} />
						<HardwareDesktopMac
							hoverColor={blue500}
							style={iconStyle} />
					</div>

					{/* list of sections */}
					{
						this.props.sectionList.map((sectionItem, idx) => (
							
							<Card key={idx} style={
								(this.state.PreviewIdx == idx) ?
									Object.assign({}, sectionContainer, focusContainer)
									:
									Object.assign({}, sectionContainer)
								}
								onClick={() => this.handleFocusCard(idx)}>
								<div style={{position: 'relative', 
												display: 'inline-block',
												width: 'calc(100% - 30px)',
												height: 48,
											}}>
									
									<div style={{position: 'absolute', 
													left: 0, 
													top: 12, 
													width: 20, 
													height: 20,
													cursor: 'pointer',
												}}>
										<ContentAddCircleOutline
											hoverColor={blue500}
											/>
									</div>	
									<TextField
										style={{position: 'absolute', left: 30, width: 'calc(100% - 30px)'}}
										hintText="Create a section"
										defaultValue={sectionItem.Title}
										/>
								</div>
								<div style={{marginTop: 12}}>
									<Collapsible 
												open={true}
												trigger={
													<div style={{height: 24, background: '#C9C9C9'}}>
														<HardwareKeyboardArrowDown
															style={{float: 'right', marginRight: 6}}
															hoverColor={blue500} />
													</div>	
												}
												triggerWhenOpen={
													<div style={{height: 24, background: '#C9C9C9'}}>
														<HardwareKeyboardArrowUp
															style={{float: 'right', marginRight: 6}}
															hoverColor={blue500} />
													</div>	
												}
										>
										<Iframe 
											url={`https://drive.google.com/open?id=${sectionItem.FileId}`}
											width="100%"
											height="556px"
											className="myClassname"
											display="initial"
											position="relative"
											allowFullScreen/>
											
									</Collapsible>
								</div>
							</Card>
						))
					}

					{/* create section card */}
					<Card style={sectionContainer}>
							<div style={{position: 'relative', 
											display: 'inline-block',
											width: 'calc(100% - 30px)',
											height: 48,
										}}>
								
								<div style={{position: 'absolute', 
												left: 0, 
												top: 12, 
												width: 20, 
												height: 20,
												cursor: 'pointer',
											}}>
									<ContentAddCircleOutline
										hoverColor={blue500}
										/>
								</div>	
								<TextField
									style={{position: 'absolute', left: 30, width: 'calc(100% - 30px)'}}
									hintText="Create a section"
									value={this.state.NewSectionTitle}
									onChange={(e, val) => this.setState({NewSectionTitle: val})}
									onKeyUp={(e) => this.handleCreateSection(e)}
									/>
							</div>
					</Card>

				</div>

				<Dialog
					title="Preview"
					modal={false}
					open={this.state.PreviewOpen}
					onRequestClose={() => this.handlePreviewClose()}
					>
					<div style={iphoneContainer}>
						<div style={iphoneViewer}>
							<Iframe 
								width="100%"
								height="100%"
								url={`https://docs.google.com/file/d/${this.state.PreviewSection.FileId}/preview?usp=drivesdk&rm=minimal`}
								display="initial"
								position="relative"
								allowFullScreen/>
						</div>	
					</div>	
					
				</Dialog>

				<Dialog
					title="Export"
					modal={false}
					open={this.state.ExportOpen}
					onRequestClose={() => this.handleExportClose()}
					>
					<div style={iphoneContainer}>
						<div style={iphoneViewer}>
							<img style={qrcode} src={this.state.ExportUrl} />
						</div>	
					</div>	
					
				</Dialog>

				<Snackbar
					bodyStyle={(this.state.SnackCorrect) ? ({backgroundColor: red500}) : ({backgroundColor: red500})}
					style={{textAlign: 'center'}}
					open={this.state.SnackOpen}
					message={this.state.SnackMessage}
					autoHideDuration={4000}
					onRequestClose={() => this.handleSnackClose()}
					/>
				
			</Card>
		)
	}
}

const styles = {

	globalLoadContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height: '100%',
		width: '100%',
		zIndex: 999,
		backgroundColor: 'rgba(255,255,255,0.5)'
	},

	globalLoader: {
		position: 'fixed',
		top: '40%',
		left: '50%',
		transform: 'translateX(-50%)',
	},

	controlContainer: {
		display: 'block',
		position: 'absolute',
		right: 12,
		top: 12,
		height: 36, 
		width: 200, 
	},

	mainContainer: {
		width: 'calc(100% - 24px)',
		margin: '0 auto',
		marginTop: 12,
		minHeight: 720
	},

	firstContainer: {
		position: 'relative',
		display: 'inline-block',
		float: 'left',
		minHeight: 643,
		borderRight: '1px solid #D8D8D8',
		transition: 'width 0.5s'
	},

	firstBig: {
		width: '80%',
	},

	firstSmall: {
		width: '50%',
	},

	previewContainer: {
		width: 'calc(100% - 18px)',
		margin: '0 auto',
		marginTop: 12,
	},

	secondContainer: {
		display: 'inline-block',
		float: 'left',
		height: 643,
		transition: 'width 0.5s',
		overflowY: 'auto'
	},

	secondBig: {
		width: '50%',
	},

	secondSmall: {
		width: '20%',
	},

	focusContainer: {
		boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(227, 98, 98, 0.6)'
	},

	iconStyle: {
		cursor: 'pointer',
		marginRight: 18
	},

	activeIconStyle:{
		color: blue500
	},

	sectionContainer:{
		width: 'calc(100% - 12px)',
		margin: '0 auto',
		marginTop: 24,
		marginBottom: 24
	},

	iphoneContainer:{
		display: 'block',
		position: 'relative',
		width: 300,
		height: 520,
		margin: '0 auto',
		backgroundImage: `url(../assets/iphone.png)`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: '100% 100%'
	},

	iphoneViewer: {
		position: 'absolute',
		width: 227,
		height: 392,
		top: 63,
		left: 36,
		zIndex: 9999
	},

	qrcode: {
		display: 'block',
		margin: '0 auto',
		marginTop: 100,
		width: 200,
		height: 200
	}

};


const stateToProps = (state) => {

	// matched here state.xxx.~~
	return {
		sectionList: state.bookmark.sectionList
	}
}

const dispatchToProps = (dispatch) => {

	return {
		docCreated: (section) => dispatch(actions.docCreated(section))
	}
}

export default connect(stateToProps, dispatchToProps)(Home);