/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var expect = require('expect');

var React = require('react/addons');
var ReactDOM = require('react-dom');
var GrabMap = require('../GrabMap');

describe("test the Leaflet Preview component", () => {
    beforeEach((done) => {
        // emulate empty map
        document.body.innerHTML = '<div><div id="snap"></div>' +
            '<div id="map" style="width:100%; height:100%"><canvas></canvas>' +
                '<div class="leaflet-tile-pane"><div class="leaflet-layer"></div></div>' +
            '</div></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("snap"));
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('component creation', () => {
        let status;
        const onStatusChange = (val) => {status = val; };
        const tb = ReactDOM.render(<GrabMap active={false} onStatusChange={onStatusChange} timeout={0} />, document.getElementById("snap"));
        expect(tb).toExist();
        tb.setProps({active: false, snapstate: {error: "Test"}});
        expect(status).toEqual("DISABLED");
    });
    it('snapshot creation', (done) => {
        const tb = ReactDOM.render(<GrabMap active={false} onSnapshotReady={() => { expect(tb.isTainted(false)); expect(tb.exportImage()).toExist(); done(); }} timeout={0} layers={[{loading: false}, {loading: false}]}/>, document.getElementById("snap"));
        expect(tb).toExist();
        tb.setProps({active: true});
    });
});