"use client";
import {
  PrimaryFeatures,
  utilities,
  communications,
  LandmarkNearby,
  secondaryFeatures,
  Amenities,
} from "@/types/Amenities";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Minus, Plus, SaveIcon } from "lucide-react";
import { Switch } from "./ui/switch";

interface AmenitiesComponentProps {
  initialFeatures: Amenities[] | [];
  onFeaturesUpdate: (features: Amenities[]) => void;
}

export function AmenitiesComponent({
  initialFeatures,
  onFeaturesUpdate,
}: AmenitiesComponentProps) {
  const [primaryFeatures, setPrimaryFeatures] = useState(() =>
    PrimaryFeatures.map((feature) => ({
      ...feature,
      count: initialFeatures.find((item) => item.id === feature.id)?.count || 0,
    }))
  );
  const [Utilities, setUtilities] = useState(() =>
    utilities.map((utility) => ({
      ...utility,
      count: initialFeatures.find((item) => item.id === utility.id)?.count || 0,
    }))
  );
  const [Communications, setCommunications] = useState(() =>
    communications.map((communication) => ({
      ...communication,
      count:
        initialFeatures.find((item) => item.id === communication.id)?.count ||
        0,
    }))
  );
  const [Landmarks, setLandmarks] = useState(() =>
    LandmarkNearby.map((landmark) => ({
      ...landmark,
      count:
        initialFeatures.find((item) => item.id === landmark.id)?.count || 0,
    }))
  );
  const [SecondaryFeatures, setSecondaryFeatures] = useState(() =>
    secondaryFeatures.map((feature) => ({
      ...feature,
      count: initialFeatures.find((item) => item.id === feature.id)?.count || 0,
    }))
  );

  const [openFeatureIndex, setOpenFeatureIndex] = useState(0);

  const NonEmptyFeatures = useMemo(() => {
    return [
      ...primaryFeatures,
      ...Utilities,
      ...Communications,
      ...Landmarks,
      ...SecondaryFeatures,
    ].filter((feature) => feature.count > 0);
  }, [
    primaryFeatures,
    Utilities,
    Communications,
    Landmarks,
    SecondaryFeatures,
  ]);

  const toggleFeature = (index: number) => {
    setOpenFeatureIndex(openFeatureIndex === index ? -1 : index);
  };

  const updatePrimaryFeatures = (
    id: string,
    action: "increment" | "decrement"
  ) => {
    setPrimaryFeatures((prev) =>
      prev.map((amenity) =>
        amenity.id === id
          ? {
              ...amenity,
              count:
                action === "increment"
                  ? amenity.count + 1
                  : Math.max(0, amenity.count - 1),
            }
          : amenity
      )
    );
  };

  const toggleAmenity = (
    id: string,
    FOR:
      | "utility"
      | "communication"
      | "landmarks"
      | "secondaryFeatures"
      | string
  ) => {
    const toggler = (prev: Amenities[]) =>
      prev.map((amenity) =>
        amenity.id === id
          ? { ...amenity, count: amenity.count === 0 ? 1 : 0 }
          : amenity
      );

    switch (FOR) {
      case "utility":
        setUtilities(toggler);
        break;
      case "communication":
        setCommunications(toggler);
        break;
      case "landmarks":
        setLandmarks(toggler);
        break;
      case "secondaryFeatures":
        setSecondaryFeatures(toggler);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onFeaturesUpdate(NonEmptyFeatures);
  }, [NonEmptyFeatures, onFeaturesUpdate]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="mx-auto">
          Add Features <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl md:p-6 px-2 py-4 md:h-[90vh] h-screen ss overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Add Property Features
          </DialogTitle>
          <DialogDescription className="text-center">
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {/* Render Feature Groups */}
        {[
          primaryFeatures,
          Utilities,
          Communications,
          Landmarks,
          SecondaryFeatures,
        ].map((features, index) => (
          <div
            key={index}
            className={`border transition-all bg-secondary ${
              openFeatureIndex === index
                ? "border-primary"
                : "border-transparent"
            } rounded-2xl p-4`}
          >
            <div
              onClick={() => toggleFeature(index)}
              className="bg-white my-2 cursor-pointer rounded-2xl px-3 py-5 flex items-center justify-between"
            >
              <b>
                {
                  [
                    "Primary Features",
                    "Utilities",
                    "Communications",
                    "Landmarks Nearby",
                    "Secondary Features",
                  ][index]
                }
              </b>{" "}
              <Plus />
            </div>
            <div
              className={`grid md:grid-cols-3 grid-cols-2 gap-4 ${
                openFeatureIndex === index ? "max-h-[110vh]" : "max-h-0"
              } transition-all duration-500 ease-in-out overflow-hidden`}
            >
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white flex items-center justify-center rounded-2xl px-3 py-5 flex-col gap-y-2"
                >
                  <Image
                    src={feature.icon}
                    alt={feature.name}
                    width={22}
                    height={22}
                  />
                  <p className="text-base text-center font-semibold">
                    {feature.name}
                  </p>
                  {index === 0 ? (
                    <div className="flex items-center gap-x-3">
                      <Button
                        variant="secondary"
                        className="w-7 h-7"
                        size="icon"
                        onClick={() =>
                          updatePrimaryFeatures(feature.id, "decrement")
                        }
                      >
                        <Minus />
                      </Button>
                      <span>{feature.count}</span>
                      <Button
                        variant="secondary"
                        className="w-7 h-7"
                        size="icon"
                        onClick={() =>
                          updatePrimaryFeatures(feature.id, "increment")
                        }
                      >
                        <Plus />
                      </Button>
                    </div>
                  ) : (
                    <Switch
                      checked={feature.count === 1}
                      onCheckedChange={() =>
                        toggleAmenity(
                          feature.id,
                          [
                            "utility",
                            "communication",
                            "landmarks",
                            "secondaryFeatures",
                          ][index - 1]
                        )
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <DialogClose asChild>
          <Button size="lg" className="mt-10">
            Save <SaveIcon />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
