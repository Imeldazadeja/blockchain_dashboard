import {getAllAssets} from "../services/AssetService";
import * as React from 'react';

export default class Asset extends React.Component {

    state = {
        assetId: [],
        asset: []
    }

    componentDidMount() {
        getAllAssets().then(response => {
            const assetData = response.data.map((item: any) => ({asset: item.asset, assetId: item.assetId}))
            this.setState({assetId: assetData.map((item: any) => item.assetId), asset: assetData.map((item: any) => item.asset)})
        })
    }



    render() {
        // Render data, assets and assetIds
            return (
                <div style={{background: "aliceblue", margin: '10px',}}>
                    <p style={{fontSize: '20px'}}>List of assets</p>
                    {this.state.asset.map(asset => (
                        <span>{`${asset}, `}</span>
                    ))}

                    <p style={{fontSize: '20px'}}>List of assetIds</p>
                    {this.state.assetId.map(assetId => (
                        <span>{`${assetId}, `}</span>
                    ))}
                </div>
            );
        }
}