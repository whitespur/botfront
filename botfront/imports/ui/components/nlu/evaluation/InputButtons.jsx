import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'semantic-ui-react';

export class InputButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: 0,
        };
    }

    componentWillMount() {
        const { operations, defaultSelection, onDefaultLoad } = this.props;

        this.setState({ toggle: defaultSelection });
        operations[defaultSelection](onDefaultLoad);
    }

    handleClick(operation, index) {
        return () => {
            this.setState({ toggle: index });
            operation();
        };
    }

    checkToggled(i) {
        const { toggle } = this.state;
        return toggle === i;
    }

    render() {
        const { labels, operations } = this.props;

        const number = _.min([labels.length, operations.length]);

        const buttons = _.zip(labels, operations, _.range(number)).map(([label, op, i]) => (
            <Button basic color={this.checkToggled(i) ? 'grey' : null} key={i.toString(10)} active={this.checkToggled(i)} onClick={this.handleClick(op, i)}>
                {label}
            </Button>
        ));

        return (
            <div>
                <Button.Group>
                    {buttons}
                </Button.Group>
            </div>
        );
    }
}

InputButtons.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    operations: PropTypes.arrayOf(PropTypes.func).isRequired,
    defaultSelection: PropTypes.number,
    onDefaultLoad: PropTypes.func,
};

InputButtons.defaultProps = {
    defaultSelection: 0,
    onDefaultLoad: () => {},
};
