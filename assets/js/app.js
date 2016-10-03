let InputBtn = React.createClass({
	getInitialState: function () {
		return {
			inputValue: '',
			inputLabel:''
		}
	},
	setValue: function (e) {
		this.setState({inputValue: e.target.value})
	},
	setLabel: function (e) {
		this.setState({inputLabel: e.target.value})
	},
	btnClick: function () {
		this.props.onAddBtn({type: "input", inputValue: this.state.inputValue, label: this.state.inputLabel});
		this.setState({inputValue: '', inputLabel: ''})
	},
	render: function () {
		return (
			<div className="form-elem">
				<h2>Create Input Field</h2>
				<div className="input-container">
					<label htmlFor="inputValue">Enter default value</label>
					<input type='text' id="inputValue" className="pull-right" value={this.state.inputValue} onChange={this.setValue}/>
				</div>
				<div className="input-container">
					<label htmlFor="inputLabel">Enter Label for Input</label>
					<input type='text' id="inputLabel" className="pull-right" value={this.state.inputLabel} onChange={this.setLabel}/>
				</div>
				<button type="button" onClick={this.btnClick}>Add input</button>
			</div>
		);
	}
});

let CheckBox = React.createClass({
	getInitialState: function () {
		return {
			checkboxValue: false,
			checkboxLabel: ''
		}
	},
	setValue: function () {
		this.setState({checkboxValue: !this.state.checkboxValue});
	},
	setLabel: function (e) {
		this.setState({checkboxLabel: e.target.value})
	},
	btnClick: function () {
		this.props.onAddBtn({type: "checkbox", checkboxValue: this.state.checkboxValue, checkboxLabel: this.state.checkboxLabel});
		this.setState({
			checkboxValue: false,
			checkboxLabel: ''
		});
	},
	render: function () {
		return (
			<div className="form-elem">
				<h2>Create Checkbox</h2>
				<div className="input-container">
					<div className="p-v-10">Default Value</div>
					<label htmlFor="true">True</label>
					<input type='checkbox' id="true" checked={this.state.checkboxValue} onChange={this.setValue}/>
					<label htmlFor="false" className="p-l-20">False</label>
					<input type='checkbox' id="false" checked={!this.state.checkboxValue} onChange={this.setValue}/>
				</div>
				<div className="input-container">
					<label htmlFor="checkboxLabel">Label for Checkbox</label>
					<input type='text' id="checkboxLabel" className="pull-right" value={this.state.checkboxLabel} onChange={this.setLabel}/>
				</div>
				<button type="button" onClick={this.btnClick}>Add checkbox</button>
			</div>
		);
	}
});

let FormList = React.createClass({
	setForm: function (elem) {
		this.props.renderForm(elem)
	},
	render: function () {
		var liTemplate = this.props.formList.map((elem, index) => {
			return (
				<tr key={index} className="table-row" onClick={() => this.setForm(elem)}>
					<td>{elem.name}</td>
					<td>{elem.date}</td>
				</tr>
			)
		})
		return (
			<div>
				<h2>List of Forms:</h2>
				<h3 className={this.props.formList.length ? 'none' : ''}>There are no saved forms</h3>
				<table className={this.props.formList.length ? '' : 'none'}>
					<thead>
						<tr onClick="">
							<th>Form Name</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{liTemplate}
					</tbody>
				</table>
			</div>
		)
	}
});
let ShowForm = React.createClass({
 	doNothing: function () {
 		
 	},
 	submitForm: function (e) {
 		e.preventDefault();
 		alert("Form submited");
 	},
	render: function () {
		var data = this.props.shForm;
		var template = data.map((elem, index) => {
			if (elem.type==='input') {
				return (
					<div key={elem.label}  className="input-container">
						<label htmlFor={elem.label}>{elem.label}</label>
						<input type='text' id={elem.label} className="pull-right" defaultValue={elem.inputValue} ref={elem.label}onChange={this.doNothing}/>
					</div>
				)
			}
			if (elem.type==='checkbox') {
				return (
					<div key={elem.checkboxLabel}  className="input-container">
						<label htmlFor={elem.checkboxLabel}>{elem.checkboxLabel}</label>
						<input type='checkbox' id={elem.checkboxLabel} defaultChecked={elem.checkboxValue} ref={elem.checkboxLabel} onChange={this.doNothing}/>
					</div>
				)	
			}
		});
		return (
			<div className={this.props.nameForm ? '' : 'none'}>
				<form onSubmit={this.submitForm}>
					<h2>{this.props.nameForm}</h2>
					{template}
					<button type="submit">Submit Form</button>
				</form>
			</div>
		)
	}
});

let Generator = React.createClass({
	getInitialState: function () {
		return {
			formJSON: [],
			formName: '',
			formList: []
		};
	},
	componentWillMount: function () {
		fetch('/get-list', {
			method: 'get', 
			headers: new Headers ({
				'Content-Type': 'application/json'
			})
		})
		.then((response) => response.json())
		.then((res) => {
			this.setState({formList: res.formList})
		})
	},
	addBtnHandler: function (btnObj) {
    	var arr = this.state.formJSON;
		arr.push(btnObj)
		this.setState({formJSON: arr})
 	},
 	setFormName: function (e) {
 		this.setState({formName: e.target.value});
 	},
 	clearForm: function () {
 		this.setState({formJSON: [], formName: ''});
 	},
 	sendForm: function () {
 		if (!this.state.formJSON.length) {
 			console.log("the form is empty")
 			return;
 		}
 		if (this.state.formJSON.length) {
 			fetch('/save-form', {
				method: 'post',
				headers: new Headers({
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({
					name: this.state.formName, 
					json: this.state.formJSON
				})
			})
 			.then((response) => response.json())
			.then((res) => {
				this.setState({formName: '', formJSON: [], formList: res.formList});
			});
 		}
 	},
 	renderForm: function (json) {
 		this.setState({formJSON: json.form, formName: json.name})
 	},
	render: function () {
		var data = this.state.formJSON;
		return (
			<div className="App flex-container">
				<div className="flex-item element-container">
					<FormList formList={this.state.formList} renderForm={this.renderForm}/>
				</div>
				<div className="flex-item element-container">
					<div>
						<h2>Create Form <button onClick={this.clearForm} className="pull-right">New Form</button></h2>

					</div>
					<div className="form-elem">
						<label htmlFor="">Form Name</label>
						<input type='text' value={this.state.formName} onChange={this.setFormName} className="pull-right" />
					</div>
					<InputBtn onAddBtn={this.addBtnHandler} />
					<CheckBox onAddBtn={this.addBtnHandler}/>
					<div className="form-elem">
						<button onClick={this.sendForm} className="pull-right">Create Form</button>
					</div>
				</div>
				<div className="flex-item element-container">
				 	<h2>Form Template</h2>
					<ShowForm shForm={this.state.formJSON} nameForm={this.state.formName} />
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<Generator />,
	document.getElementById("root")
)