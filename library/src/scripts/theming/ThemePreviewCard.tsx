/**
 *
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import React from "react";
import { themeCardClasses } from "./themeCardStyles";
import { ButtonTypes } from "@library/forms/buttonStyles";
import Button from "@library/forms/Button";
import { t } from "@library/utility/appUtils";

interface IProps {
    globalBg: string;
    globalFg: string;
    globalPrimary: string;
    titleBarBg: string;
    titleBarFg: string;
    headerImg?: string;
    onApply?: () => void;
    onPreview?: () => void;
    onCopy?: () => void;
}
interface IState {}

export default class ThemePreviewCard extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    public render() {
        const tiles = [1, 2, 3, 4];
        const { globalBg, globalPrimary, globalFg, titleBarBg, titleBarFg } = this.props;
        const classes = themeCardClasses();
        const titlebarStyle = {
            backgroundColor: titleBarBg,
        };

        const titleBarLinks = {
            backgroundColor: titleBarFg,
        };

        const containerStyle = {
            border: `1px solid ${globalBg}`,
        };

        const headerStyle = {
            backgroundColor: globalPrimary,
        };
        const subCommunityTileStyle = {
            border: `1px solid ${globalBg}`,
            boxShadow: `0 1px 3px 0 rgba(85,90,98,0.3)`,
            color: `${globalBg}`,
        };
        const tileImgStyle = {
            border: `1px solid ${globalBg}`,
        };
        const tileHeaderStyle = {
            backgroundColor: globalFg,
        };

        const tileTextStyle = {
            backgroundColor: globalFg,
        };

        return (
            <React.Fragment>
                <div style={containerStyle} className={classes.container}>
                    <div className={classes.wrapper}>
                        <div style={titlebarStyle} className={classes.titlebar}>
                            <ul className={classes.titleBarNav}>
                                <li style={titleBarLinks} className={classes.titleBarLinks}></li>
                                <li style={titleBarLinks} className={classes.titleBarLinks}></li>
                                <li style={titleBarLinks} className={classes.titleBarLinks}></li>
                            </ul>
                        </div>
                        <div style={headerStyle} className={classes.header}></div>

                        <div className={classes.subCommunityContent}>
                            <ul className={classes.subCommunityList}>
                                {tiles.map((val, key) => (
                                    <li key={key} className={classes.subCommunityListItem}>
                                        <div style={subCommunityTileStyle} className={classes.subCommunityTile}>
                                            <div style={tileImgStyle} className={classes.tileImg}></div>
                                            <div style={tileHeaderStyle} className={classes.tileHeader}></div>
                                            <div className={classes.tileContent}>
                                                <p style={tileTextStyle} className={classes.text1}></p>
                                                <p style={tileTextStyle} className={classes.text2}></p>
                                                <p style={tileTextStyle} className={classes.text3}></p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={classes.actionButtons}>
                            <Button
                                baseClass={ButtonTypes.PRIMARY}
                                className={classes.buttons}
                                onClick={this.props.onApply}
                            >
                                {t("Apply")}
                            </Button>
                            <Button
                                baseClass={ButtonTypes.PRIMARY}
                                className={classes.buttons}
                                onClick={this.props.onPreview}
                            >
                                {t("Preview")}
                            </Button>
                            <Button
                                baseClass={ButtonTypes.PRIMARY}
                                className={classes.buttons}
                                onClick={this.props.onCopy}
                            >
                                {t("Copy")}
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}