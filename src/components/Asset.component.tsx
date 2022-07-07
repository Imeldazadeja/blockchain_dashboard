import {getAllAssets} from "../services/AssetService";
import * as React from 'react';

export default class Asset extends React.Component {

    state = {
        assetId: [],
        asset: []
    }

    componentDidMount() {
        getAllAssets().then(response => {
            console.log(response);
            const assetData = response.data.map((item: any) => ({asset: item.asset, assetId: item.assetId}))
            this.setState({assetId: assetData.map((item: any) => item.assetId), asset: assetData.map((item: any) => item.asset)})
        })
    }



    render() {
            return (
                <ul>
                    <p>List of assets</p>
                    {this.state.asset.map(asset => (
                        <li>{asset}</li>
                    ))}
                    <p>List of assetIds</p>
                    {this.state.assetId.map(assetId => (
                        <li>{assetId}</li>
                    ))}
                </ul>
            );
        }
}