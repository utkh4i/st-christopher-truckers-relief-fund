"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "nextjs-toploader/app";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useEnrollmentForm from "@/hooks/useEnrollmentForm";
import {
  QualifyingQuestionsSection,
  qualifyingQuestionsSectionValidator,
} from "@/types";

import ControlledTextField from "../controlled/ControlledTextField";

export default function QualifyingQuestionsFormSection(): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const {
    enrollmentForm,
    completedSections,
    updateQualifyingQuestionsSection,
  } = useEnrollmentForm();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
  } = useForm<QualifyingQuestionsSection>({
    resolver: zodResolver(qualifyingQuestionsSectionValidator),
    defaultValues: enrollmentForm.qualifyingQuestionsSection,
  });

  // redirect to general information section if missing previous sections
  useEffect(() => {
    if (!completedSections.generalInformationSectionCompleted) {
      router.push("/enrollment-form/general-information");
    }
  }, [completedSections.generalInformationSectionCompleted, router]);

  const onSubmit = (data: QualifyingQuestionsSection): void => {
    setIsLoading(true);
    updateQualifyingQuestionsSection(data);
    router.push("/enrollment-form/program-selection");
  };

  const { enqueueSnackbar } = useSnackbar();

  const onError = (): void => {
    enqueueSnackbar("Please review all fields before continuing.", {
      variant: "error",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
        }}
      >
        {/* Title: Qualifying Questions */}
        <Typography variant="h4">Qualifying Questions</Typography>
        <Divider />

        {/* Section Title: Diagnoses */}
        <Typography variant="h6">Diagnoses</Typography>
        <Typography>
          Which of the following conditions do you have? Check all that apply
        </Typography>

        <Controller
          name="diagnoses.hasType1Diabetes"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Type 1 Diabetes"
            />
          )}
        />

        <Controller
          name="diagnoses.hasType2Diabetes"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Type 2 Diabetes"
            />
          )}
        />

        <Controller
          name="diagnoses.hasHighBloodPressure"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="High Blood Pressure"
            />
          )}
        />

        <Controller
          name="diagnoses.hasHighCholesterol"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="High Cholesterol"
            />
          )}
        />

        <Controller
          name="diagnoses.hasHeartDisease"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Heart Disease"
            />
          )}
        />

        <Controller
          name="diagnoses.isObese"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Obese"
            />
          )}
        />

        <Controller
          name="diagnoses.noneOfTheAbove"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="None of the above"
            />
          )}
        />

        <ControlledTextField
          control={control}
          name="diagnoses.hasOther"
          label="Other"
          variant="outlined"
          error={errors.diagnoses?.hasOther}
          multiline
          rows={3}
        />

        <Divider />

        {/* Section Title: Other */}
        <Typography variant="h6">Other</Typography>

        <FormControl error={!!errors.isTobaccoUser} sx={{ width: "100%" }}>
          <FormLabel>Are you a tobacco user?</FormLabel>
          <Controller
            name="isTobaccoUser"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.isTobaccoUser?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.hasAppliedForFinancialAssistance}
          sx={{ width: "100%" }}
        >
          <FormLabel>Have you ever applied for financial assistance?</FormLabel>
          <Controller
            name="hasAppliedForFinancialAssistance"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.hasAppliedForFinancialAssistance?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.hasHealthConditionCausedByTobaccoUse}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you have a health condition that may have been caused or
            exacerbated by tobacco use? (e.g. lung cancer, stroke, etc.)
          </FormLabel>
          <Controller
            name="hasHealthConditionCausedByTobaccoUse"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.hasHealthConditionCausedByTobaccoUse?.message}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.hasHealthInsurance} sx={{ width: "100%" }}>
          <FormLabel>Do you have health insurance?</FormLabel>
          <Controller
            name="hasHealthInsurance"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.hasHealthInsurance?.message}
          </FormHelperText>
        </FormControl>

        {enrollmentForm.generalInformationSection.sex === "male" && (
          <FormControl
            error={!!errors.hasCloseFamilyHistoryOfProstateCancer}
            sx={{ width: "100%" }}
          >
            <FormLabel>
              Do you have a close family history (father or brother) of prostate
              cancer?
            </FormLabel>
            <Controller
              name="hasCloseFamilyHistoryOfProstateCancer"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  value={field.value !== undefined ? String(field.value) : ""}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              )}
            />
            <FormHelperText sx={{ m: 0 }}>
              {errors.hasCloseFamilyHistoryOfProstateCancer?.message}
            </FormHelperText>
          </FormControl>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 2,
          }}
        >
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              setIsLoading(true);
              router.push("/enrollment-form/general-information");
            }}
            loading={isLoading}
            sx={{ width: "100%" }}
          >
            Back
          </LoadingButton>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            sx={{ width: "100%" }}
          >
            Next
          </LoadingButton>
        </Box>

        <Typography color="red">
          {submitCount && !isSubmitSuccessful
            ? "Please review all fields before continuing."
            : ""}
        </Typography>
      </Box>
    </form>
  );
}
