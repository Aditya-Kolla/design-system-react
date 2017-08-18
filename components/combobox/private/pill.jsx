/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import UtilityIcon from '~/components/utilities/utility-icon';

import assign from 'lodash.assign';

import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';

import { shape } from 'airbnb-prop-types';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `pressDeleteOrBackspace`: Informs user of keyboard keys to press in order to remove a pill
	 */
	assistiveText: shape({
		pressDeleteOrBackspace: PropTypes.string
	}),
	/*
	 * Pills are often used for selection of a type of entity such as days in a daypicker. This prop allows you to pass in data that will be passed back to the event handler.
	 */
	eventData: PropTypes.object,
	/*
	 * Pill Label
	 */
	labels: shape({
		label: PropTypes.string,
		remove: PropTypes.string,
		title: PropTypes.string
	}),
	/*
	 * Pill Title
	 */
	title: PropTypes.string,
	/*
	 * Callback called when pill is clicked, delete is pressed, or backspace is pressed.
	 */
	events: shape({
		onRequestRemove: PropTypes.func
	})
};

const defaultProps = {
	assistiveText: shape({
		pressDeleteOrBackspace: 'Press delete or backspace to remove'
	}),
	labels: {
		remove: 'Remove'
	},
	events: {}
};

const handleKeyDown = (event, { events, data }) => {
	// Helper function that takes an object literal of callbacks that are triggered with a key event
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.DELETE]: { callback: events.onRequestRemove, data },
			[KEYS.BACKSPACE]: { callback: events.onRequestRemove, data }
		}
	});
};

const Pill = (props) => {
	const assistiveText = assign({}, defaultProps.assistiveText, props.assistiveText);
	const labels = assign({}, defaultProps.labels, props.labels);

	return (
		<span // eslint-disable-line jsx-a11y/no-static-element-interactions
			className="slds-pill"
			role="option"
			tabIndex={0}
			aria-selected="true"
			onKeyDown={(event) => {
				handleKeyDown(event, {
					events: props.events,
					data: props.eventData
				});
			}}
		>
			<span className="slds-pill__label" title={labels.title}>{labels.label}</span>
			{props.events.onRequestRemove
				? <span className="slds-icon_container slds-pill__remove" title={labels.remove}>
					<UtilityIcon
						aria-hidden="true"
						category="utility"
						className="slds-icon slds-icon--x-small slds-icon-text-default"
						name="close"
					/>
					<span className="slds-assistive-text">{assistiveText.pressDeleteOrBackspace}</span>
				</span>
			: null}
		</span>
	);
};

Pill.displayName = 'Pill';
Pill.propTypes = propTypes;
Pill.defaultProps = defaultProps;

export default Pill;
