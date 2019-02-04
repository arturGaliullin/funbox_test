import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditorItems extends Component {
    onDelete = (e, id) => {
        e.preventDefault();
        this.props.removePlacemark(id);
    };

    onDragStart = (e, i) => {
        this.draggedItem = this.props.placemarks[i];
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target);
        e.dataTransfer.setDragImage(e.target, 20, 20);
    };

    onDragOver = i => {
        const draggedOverItem = this.props.placemarks[i];

        if (this.draggedItem === draggedOverItem) {
            return;
        }

        const items = this.props.placemarks.filter(placemark => placemark.id !== this.draggedItem.id);

        items.splice(i, 0, this.draggedItem);

        this.props.updatePlacemarks(items);
    };

    onDragEnd = () => {
        this.draggedIdx = null;
    };

    render() {
        return (
            <div className='editor__items'>
                {this.props.placemarks.map((placemark, i) =>
                    <div key={placemark.id} className='editor__item' onDragOver={() => this.onDragOver(i)}>
                        <div
                            draggable
                            onDragStart={(e) => this.onDragStart(e, i)}
                            onDragEnd={this.onDragEnd}
                        >
                            <span className='editor__item-name'>{placemark.name}</span>
                            <button onClick={(e) => this.onDelete(e, placemark.id)} className="button editor__item-button">X</button>
                        </div>
                    </div>

                )}
            </div>
        )
    }
}

EditorItems.propTypes = {
    removePlacemark: PropTypes.func,
    updatePlacemarks: PropTypes.func,
    placemarks: PropTypes.array
};