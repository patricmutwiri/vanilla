/**
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import IndependentSearch from "@library/features/search/IndependentSearch";
import { ButtonTypes } from "@library/forms/buttonStyles";
import Container from "@library/layout/components/Container";
import { Devices, useDevice } from "@library/layout/DeviceContext";
import FlexSpacer from "@library/layout/FlexSpacer";
import Heading from "@library/layout/Heading";
import { PanelWidgetHorizontalPadding } from "@library/layout/PanelLayout";
import { useBannerContainerDivRef } from "@library/banner/BannerContext";
import { bannerClasses, bannerVariables } from "@library/banner/bannerStyles";
import { ColorValues } from "@library/styles/styleHelpersColors";
import { t, assetUrl } from "@library/utility/appUtils";
import classNames from "classnames";
import React from "react";
import { titleBarClasses, titleBarVariables } from "@library/headers/titleBarStyles";
import { DefaultBannerBg } from "@library/banner/DefaultBannerBg";
import { getBackgroundImage } from "@library/styles/styleHelpers";
import { SearchBarButtonType } from "@library/headers/mebox/pieces/compactSearchStyles";

interface IProps {
    action?: React.ReactNode;
    title?: string; // Often the message to display isn't the real H1
    description?: React.ReactNode;
    className?: string;
    image?: string;
}

/**
 * A component representing a single crumb in a breadcrumb component.
 */
export default function Banner(props: IProps) {
    const device = useDevice();
    const ref = useBannerContainerDivRef();

    const { action, className, title, description } = props;

    const varsTitleBar = titleBarVariables();
    const classesTitleBar = titleBarClasses();
    const classes = bannerClasses();
    const vars = bannerVariables();
    const { options } = vars;

    const isImageBg = vars.options.imageType === "background";
    const imageSrc = assetUrl(props.image ?? vars.outerBackground.image ?? "");

    return (
        <div
            ref={ref}
            className={classNames(className, classes.root, {
                [classesTitleBar.negativeSpacer]: varsTitleBar.fullBleed.enabled,
            })}
        >
            <div className={classNames(classes.outerBackground(props.image ?? undefined))}>
                {!props.image && !vars.outerBackground.image && <DefaultBannerBg />}
            </div>
            {vars.backgrounds.useOverlay && isImageBg && <div className={classes.backgroundOverlay} />}
            <Container>
                {options.imageType === "element" && <img className={classes.imageElement} src={imageSrc}></img>}
                <div className={classes.innerContainer}>
                    <PanelWidgetHorizontalPadding className={classes.widget}>
                        <div className={classes.titleWrap}>
                            <FlexSpacer className={classes.titleFlexSpacer} />
                            {title && <Heading title={title} className={classes.title} />}
                            <div className={classNames(classes.text, classes.titleFlexSpacer)}>{action}</div>
                        </div>
                        {!options.hideDesciption && description && (
                            <div className={classes.descriptionWrap}>
                                <p className={classNames(classes.description, classes.text)}>{description}</p>
                            </div>
                        )}
                        {!options.hideSearch && (
                            <div className={classes.searchContainer}>
                                <IndependentSearch
                                    buttonClass={classes.searchButton}
                                    buttonBaseClass={ButtonTypes.CUSTOM}
                                    isLarge={true}
                                    placeholder={t("Search")}
                                    inputClass={classes.input}
                                    iconClass={classes.icon}
                                    buttonLoaderClassName={classes.buttonLoader}
                                    hideSearchButton={
                                        device === Devices.MOBILE ||
                                        device === Devices.XS ||
                                        vars.searchButtonOptions.type === SearchBarButtonType.NONE
                                    }
                                    contentClass={classes.content}
                                    valueContainerClasses={classes.valueContainer}
                                />
                            </div>
                        )}
                    </PanelWidgetHorizontalPadding>
                </div>
            </Container>
        </div>
    );
}
