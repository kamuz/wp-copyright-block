/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { showStartingYear, startingYear } = attributes;
	const currentYear = new Date().getFullYear().toString();

	//
	let displayDate;

	if ( showStartingYear && startingYear ) {
		displayDate = startingYear + ' – ' + currentYear;
	} else {
		displayDate = currentYear;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'copyright-date-block' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						// If showStartingYear is true set checked attribute
						checked = { !! showStartingYear }
						// Label with localization string
						label = { __(
							'Show starting year',
							'copyright-date-block'
						) }
						onChange={ () =>
							setAttributes( {
								// If setting will changed need invert current value
								showStartingYear: !showStartingYear,
							} )
						}
					/>
					{ showStartingYear && ( // If showStartingYear is true will run next code
						<TextControl
							// Controll margin
							__nextHasNoMarginBottom
							// Label for setting
							label={ __(
								'Starting year',
								'copyright-date-block'
							) }
							// If false this always empty string
							value={ startingYear || '' }
							// If change value, need rewrite var startingYear
							onChange={ ( value ) =>
								setAttributes( { startingYear: value } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>
				{ __(
					'Copyright',
					'copyright-date-block'
				) } &copy; { displayDate }
			</p>
		</>
	);
}
