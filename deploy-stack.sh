#!/bin/bash

# Function to display help
usage() {
  echo "Usage: $0 -p package -s stage [-r region]"
  echo "  -p package  Specify the package to deploy."
  echo "  -s stage    Specify the stage (dev or prd)."
  echo "  -r region   Specify the AWS region (default: us-east-1)."
  exit 1
}

# Predetermined values
REGION="us-west-2"

# Parse arguments
while getopts ":p:s:r:" opt; do
  case ${opt} in
    p)
      PACKAGE=$OPTARG
      ;;
    s)
      STAGE=$OPTARG
      if [[ "$STAGE" != "dev" && "$STAGE" != "prd" ]]; then
        echo "Error: Stage must be 'dev' or 'prd'."
        usage
      fi
      ;;
    r)
      REGION=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      usage
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      usage
      ;;
  esac
done

# Verify that the required arguments have been provided
if [ -z "$PACKAGE" ] || [ -z "$STAGE" ]; then
  echo "Error: Package and stage are required."
  usage
fi

# Pre deploy
cd stacks/$PACKAGE

# Deploy
if sls deploy --stage $STAGE --region $REGION --config serverless.$STAGE.yml ; then
  echo "$(date '+%d/%m/%Y %H:%M:%S') The $PACKAGE stack deployed was successfully."
else
  echo "$(date '+%d/%m/%Y %H:%M:%S') The $PACKAGE stack deployed was failed."
fi
